import {Component, OnInit, ViewChild} from '@angular/core';
import {FlashMessagesService} from 'ngx-flash-messages';
import {FirebaseService} from '../services/firebase.service';
import {TwitterService} from '../services/twitter.service';
import {ResultModel} from '../services/result.model';
import {ResultDisplayComponent} from '../result-display/result-display.component';
import {BlocksService} from '../blocks.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-blockly',
  templateUrl: './blockly.component.html',
  styleUrls: ['./blockly.component.css']
})
export class BlocklyComponent implements OnInit {

  resultDisplay;
  workspace_list: {id, name}[];

  constructor(
    private flashMessagesService: FlashMessagesService,
    private firebaseService: FirebaseService,
    private twitterService: TwitterService,
  ) {

  }

  private static calc_distribution(arr: ResultModel[]) {
    let positive = 0;
    let negative = 0;
    let neutral = 0;
    for (const res of arr) {
      if (res.score > 0) {
        positive++;
      } else if (res.score < 0) {
        negative++;
      } else {
        neutral++;
      }
    }
    return {
      positive: positive,
      negative: negative,
      neutral: neutral
    };
  }

  ngOnInit() {
    const user_name = sessionStorage.getItem('user_name');
    const usersRef = this.firebaseService.database().ref(user_name);
    BlocksService.inject_blocks('blocklyDiv');
    usersRef.on('value', (data) => {
        this.workspace_list = [];  // TODO add just the workspace changed (O(1) time, currently O(n))
        const savespace = data.val();
        const keys = Object.keys(savespace);
        for (let i = 0; i < keys.length; i++) {
          const k = keys[i];
          const name = savespace[k].name;
          this.workspace_list.push( { 'id': i, 'name': name} );
        }
    }, (err) => {
      console.log(err);
    });
  }

  button_callback(workspace_name: string) {
    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
    });
    swalWithBootstrapButtons({
      title: 'What would you like to do with this workspace?',
      showCancelButton: true,
      confirmButtonText: 'Load',
      showCloseButton: true,
      cancelButtonText: 'Delete',
      reverseButtons: false
    }).then((result) => {
      if (result.value) {
        const ref = sessionStorage.getItem('user_name') + '/' + workspace_name;
        this.firebaseService.database().ref(ref).once('value')
          .then((dataSnapshot) => {
            BlocksService.xml_string_to_workspace(dataSnapshot.val().workspace);
          });
        swalWithBootstrapButtons(
          'Load Complete',
          'Your workspace was successfully loaded.',
          'success'
        ).then(() => {});
      } else if (result.dismiss === swal.DismissReason.cancel) { // Read more about handling dismissals
        this.delete_workspace(workspace_name).then(() => {});
        swalWithBootstrapButtons(
          'Deleted',
          'Your workspace was successfully deleted',
          'success'
        ).then(() => {});
      }
    });
  }

  async save_workspace() {
    const {value: workspace} = await swal({
      title: 'What name would you like to save this workspace as?',
      input: 'text',
      showCancelButton: true,
      inputValidator: (value) => {
        return !value && 'You need to write something!';
      }
    });

    const msg_success = 'Successfully saved';
    const msg_fail = 'you need to login first';
    const user_name = sessionStorage.getItem('user_name');
    const usersRef = this.firebaseService.database().ref(user_name + '/' + workspace);
    if (user_name && workspace != null) {
      usersRef.set({
        name: workspace,
        workspace: BlocksService.workspace_to_xml_string()
      }).then(() => this.flashMessagesService.show(msg_success, {timeout: 10000}));
      swal({
        position: 'center',
        type: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {});
    } else {
      this.flashMessagesService.show(msg_fail, {timeout: 10000});
    }
  }

  async delete_workspace(workspace_name: string) {
    const user_name = sessionStorage.getItem('user_name');
    const usersRef = this.firebaseService.database().ref(user_name);
    usersRef.child(workspace_name).remove().then(() => {});
    BlocksService.clear();
    swal({
      position: 'center',
      type: 'success',
      title: 'Your work has been deleted',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {});
  }

  @ViewChild(ResultDisplayComponent)
  set resultDisplayComponent (resultDisplay: ResultDisplayComponent) {
    this.resultDisplay = resultDisplay;
    console.log('successfully captured child component: ', resultDisplay);
  }
  run_query(): void {
    this.twitterService.get_tweets(BlocksService.show_code()).subscribe({
      next: x => {
        const distribution = BlocklyComponent.calc_distribution(x);
        this.resultDisplay.update_contents(
          distribution.positive,
          distribution.negative,
          distribution.neutral
        );
      },
      error: err => console.log('cannot update, ', err),
      complete: () => console.log('query completed')
    });
  }

  show_code(): void {
    BlocksService.show_code();
  }
}
