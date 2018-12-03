
export class CQLBlocks {

    public static Msg = {
        // All medication datatype dropdowns
        MED_DATATYPE_DROPDOWNS: [['Active', 'med_active'],
                        ['Administered', 'med_admin'],
                        ['Discharge', 'med_discharge'],
                        ['Dispensed', 'med_dispensed'],
                        ['Order', 'med_order']],
        // All medication attribute dropdowns - 
        MED_ATTR_DROPDOWNS: [
            ['Dosage', 'med_dosage'], // 0
            ['Supply', 'med_supply'], // 1
            ['Frequency', 'med_freq'], // 2
            ['Negation Rationale', 'neg_rationale'], // 3
            ['Reason', 'reason'], // 4
            ['Refills', 'refills'], // 5
            ['Method', 'method'], // 6
            ['Route', 'med_route'], // 7
            ['Relevant Period', 'med_rel_period'], // 8
            ['Author dateTime', 'author_datetime'], // 9
            ['Code', 'med_code'], // 10
            ['id', 'med_id'] // 11
        ],
        // the mask is used to pick the right dropdown items from the list above
        MED_DATATYPE_ATTR_MAP: {
            med_active: { label: 'Active', mask: '111000011011' },
            med_admin: { label: 'Administered', mask: '111110011111' },
            med_discharge: { label: 'Discharge', mask: '101101010111'},
            med_dispensed: { label: 'Dispensed', mask: '111101011111'},
            med_order: { label: 'Order', mask: '111111111111' }
        },

        // ENCOUNTER
        ENC_DATATYPE_DROPDOWNS: [['Performed', 'enc_performed'],
                                ['Recommended', 'enc_recommended'],
                                ['Order', 'enc_order']],
        ENC_ATTR_DROPDOWNS: [
            ['Facility Location', 'fac_loc'], // 0
            ['Relevent Period', 'enc_rel_period'], // 1
            ['Admission Source', 'enc_adm_src'], // 2
            ['Diagnoses', 'enc_diagnoses'], // 3
            ['Discharge Disposition', 'enc_disch_disposition'], // 4
            ['Length of Stay', 'enc_length_stay'], // 5
            ['Reason', 'enc_reason'], // 6
            ['Negation Rationale', 'enc_neg_rat'], // 7
            ['Pricipal Diagnosis', 'enc_prin_diag'], // 8
            ['Author dateTime', ' enc_author_date_time'], // 9
            ['Code', 'enc_code'], // 10
            ['id', 'enc_id'], // 11
            ['Facility Locations', 'fac_locs'], // 12
        ],
        ENC_DATATYPE_ATTR_MAP: {
            enc_performed: { label: 'Performed', mask: '0111110111111' },
            enc_recommended: { label: 'Recommended', mask: '100000110111' },
            enc_order: { label: 'Order', mask: '1000001101110'},
            },

        // CONDITIONS
        CONDITION_DATATYPE_DROPDOWNS: [['Diagnosis', 'cond_diagnosis'],
            ['Condition', 'cond_condition'],
            ['Problem', 'cond_problem']],
        CONDITION_ATTR_DROPDOWNS: [
            ['Prevelance Period', 'attr_prev_period'],
            ['Anatomical Location Site', 'attr_anat_loc_site'],
            ['Severity', 'attr_severity'],
            ['code', 'attr_code'],
            ['Author Date time', 'attr_auth_datetime'],
            ['id', 'attr_id']],
        CONDITION_DATATYPE_ATTR_MAP: {
            cond_diagnosis: { label: 'Diagnosis', mask: '111111' },
            cond_condition: { label: 'Condition', mask: '111111' },
            cond_problem: { label: 'Problem', mask: '111111'},
        },
        // LAB TESTS
        LABTEST_DATATYPE_DROPDOWNS: [['Order', 'labtest_order'],
        ['Performed', 'labtest_performed'],
        ['Recommended', 'labtest_recommended']],
        LABTEST_ATTR_DROPDOWNS: [['Method', 'labtest_method'],
        ['Negation Rationale', 'labtest_neg_rat'],
        ['Reason', 'labtest_reason'],
        ['Reference Range High', 'labtest_ref_range_high'],
        ['Reference Range Low', 'labtest_ref_range_low'],
        ['Result', 'labtest_result'],
        ['Result dateTime', 'labtest_datetime'],
        ['Relevant Period', 'labtest_relevant_period'],
        ['Status', 'labtest_status'],
        ['code', 'attr_code'],
        ['Author Date time', 'attr_auth_datetime'],
        ['id', 'attr_id'],
        ['Component', 'labtest_component']],
        LABTEST_DATATYPE_ATTR_MAP: {
            labtest_order: { label: 'Diagnosis', mask: '111111' },
            labtest_performed: { label: 'Condition', mask: '111111' },
            labtest_recommended: { label: 'Problem', mask: '111111'},
        },

        DROPDOWN: { TIME: [],
                    DATEFUNCTION: [],
                    OTHER: [],
                    RESULT: [
                        ['=', 'result_equal'],
                        ['<', 'result_lt'],
                        ['>', 'result_gt'],
                        ['<=', 'result_lte'],
                        ['>=', 'result_gte'],
                        ['<>', 'result_ne']
                    ],
                    LAB_TEST: {
                        DATATYPE: [['Order', 'labtest_order'],
                        ['Performed', 'labtest_performed'],
                        ['Recommended', 'labtest_recommended']],
                        ATTRIBUTE: [['Method', 'labtest_method'],
                        ['Negation Rationale', 'labtest_neg_rat'],
                        ['Reason', 'labtest_reason'],
                        ['Reference Range High', 'labtest_ref_range_high'],
                        ['Reference Range Low', 'labtest_ref_range_low'],
                        ['Result', 'labtest_result'],
                        ['Result dateTime', 'labtest_datetime'],
                        ['Relevant Period', 'labtest_relevant_period'],
                        ['Status', 'labtest_status'],
                        ['code', 'attr_code'],
                        ['Author Date time', 'attr_auth_datetime'],
                        ['id', 'attr_id'],
                        ['Component', 'labtest_component']]
                    }
                },
        Blocks: {LIST: 'LISTENTRIES',
            LIST_ENTRY: 'ENTRY'
            },
        Tooltips: {
            ARRAY: 'Array.'
        }
    };
    // Given an input mask, return all items that match the mask from the second param 
    public static getMatchingItems(mask, dropdown_list) {
        let ret_val = [];
        for (let i = 0; i < mask.length; i++) {
            if (mask[i] === '1') {
                ret_val.push(dropdown_list[i]);
            }
        }
        return ret_val;
    }
    public static init() {
        CQLBlocks.Msg.Blocks.LIST = 'LISTENTRIES';
        CQLBlocks.Msg.Blocks.LIST_ENTRY = 'ENTRY';
        CQLBlocks.Msg.DROPDOWN.TIME = [
            ['MICROSENCONDS', 'MICROSECONDS'],
            ['SECOND', 'SECOND'],
            ['MINUTE', 'MINUTE'],
            ['HOUR', 'HOUR'],
            ['DAY', 'DAY'],
            ['WEEK', 'WEEK'],
            ['MONTH', 'MONTH'],
            ['QUARTER', 'QUARTER'],
            ['YEAR', 'YEAR'],
            ['SECOND_MICROSECOND', 'SECOND_MICROSECOND'],
            ['MINUTE_MICROSECOND', 'MINUTE_MICROSECOND'],
            ['MINUTE_SECOND', 'MINUTE_SECOND'],
            ['HOUR_MICROSECOND', 'HOUR_MICROSECOND'],
            ['HOUR_SECOND', 'HOUR_SECOND'],
            ['HOUR_MINUTE', 'HOUR_MINUTE'],
            ['DAY_MICROSECOND', 'DAY_MICROSECOND'],
            ['DAY_SECOND', 'DAY_SECOND'],
            ['DAY_MINUTE', 'DAY_MINUTE'],
            ['DAY_HOUR', 'DAY_HOUR'],
            ['YEAR_MONTH', 'YEAR_MONTH']
        ];
        CQLBlocks.Msg.DROPDOWN.DATEFUNCTION = [
            // ['SYSDATE', 'sysdate'],
            // ['DATE ADD', 'add_months'], //using date_add()because add-month is an oracle function
            // ['DATE SUB', 'sub_months'],
            // ['LAST DAY', 'last_day'],
            ['NOW', 'now'],
            // ['MONTH', 'month'],
            // ['YEAR', 'year'],
            // ['EXTRACT', 'extract'],
            ['CURDATE', 'curdate'],
            ['DATE', 'date'],
            // ['TO CHAR', 'date_format'] //Using date_format instead of to_char, because to_char is not a mysql function
        ];
        CQLBlocks.Msg.DROPDOWN.OTHER = [
            ['IF', 'decode'], // using if because decode is an oracle function. It is equivalent to if in mysql
            ['GREATEST', 'greatest'],
            ['LEAST', 'least'],
            ['IFNULL', 'nvl'] // using ifNull because nvl is an oracle function. It is equivalent to ifNULL in mysql
        ];
    }
}


