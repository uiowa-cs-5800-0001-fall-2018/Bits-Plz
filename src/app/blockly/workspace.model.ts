export interface WorkspaceModel {
  name: string;
  created_at: Date;
  last_updated_at: Date;
  contents: string; // the xml representing workspace
}
