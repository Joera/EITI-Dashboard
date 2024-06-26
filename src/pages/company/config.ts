import { IGroupMappingV2 } from "../shared/interfaces";

const bedrijf : IGroupMappingV2[] = [
    {
        "slug" : "betalingen_bedrijven",
        "ctrlr": "RevenueIntroGroupV1",
        "graphs": [
            {
            "slug" : "frist",
            "ctrlr" : "RevenueBarsV1",
            "args" : [],
            "parameters": [
                [
                    {
                        "label": "bedrijf",
                        "column": "payments_companies",
                        "colour": "orange"
                    }
                ]
            ]
            }
        ],
        "header": "Betalingen van bedrijven per jaar op projectniveau",
        "header_en": "Company payments on project level",
        "functionality": ["table"],
        "description": "Hier staan de gereconcilieerde betalingen die gerapporteerd worden op projectniveau weergegeven.",
        "description_en": "Aggregated payments on project level that have been matched. Data is incomplete.",
        "endpoints": ["payments"],
        "segment": "nam",
    },
    // {
    //     "slug" : "inkomsten_stroommodel",
    //     "graph": "CompanySankeyV1",
    //     "args" : [],
    //     "parameters": [
    //         [
    //             {
    //                 "label": "betaalstroom",
    //                 "column": "payments_companies",
    //                 "colour": "orange"
    //             }
    //         ]
    //     ],
    //     "header": "Type betaalstromen richting overheid",
    //     "multiGraph": false,
    //     "functionality": ['yearSelect'],
    //     "description": "Nam et blandit nisl, et vestibulum erat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque scelerisque ante sit amet iaculis pellentesque. Integer id metus in eros tempor fringilla vulputate ut massa. Morbi ut consectetur nunc. Nunc iaculis laoreet venenatis. Aliquam maximus sodales eleifend.",
    //     "endpoint": "government_revenue",
    //     "segment": "2022",
    //     "elementClasslist": ['graph-container','graph-container-12']
    // },
    // {
    //     "slug" : "oppervlakterecht_kaart",
    //     "graph": "CompanyMapV1",
    //     "args" : [],
    //     "parameters": [
    //         [
    //             {
    //                 "label": "betaalstroom",
    //                 "column": "payments_companies",
    //                 "colour": "orange"
    //             }
    //         ]
    //     ],
    //     "header": "Kaart oppervlakterecht",
    //     "multiGraph": false,
    //     "functionality": ['yearSelect'],
    //     "description": "Nam et blandit nisl, et vestibulum erat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque scelerisque ante sit amet iaculis pellentesque. Integer id metus in eros tempor fringilla vulputate ut massa. Morbi ut consectetur nunc. Nunc iaculis laoreet venenatis. Aliquam maximus sodales eleifend.",
    //     "endpoint": "government_revenue",
    //     "segment": "2022",
    //     "elementClasslist": ['graph-container','graph-container-12']
    // },
    // {
    //     "slug" : "reconciliatie_per_jaar",
    //     "graph": "CompanyReconciliationV1",
    //     "args" : [],
    //     "parameters": [
    //         [
    //             {
    //                 "label": "bedrijf",
    //                 "column": "pre_company_report",
    //                 "colour": "orange",
    //                 "format": "percentage"
    //             }
    //         ]
    //     ],
    //     "header": "Reconciliatie per jaar",
    //     "multiGraph": false,
    //     "functionality": [],
    //     "description": null,
    //     "endpoint": "reconciliatie",
    //     "segment": "2022",
    //     "elementClasslist": ['graph-container','graph-container-12']
    // },
    // {
    //     "slug" : "betaalstromen_ebn",
    //     "graph": "EbnCirclesV1",
    //     "args" : [],
    //     "parameters": [
    //         [
    //             {
    //                 "label": "Kosten",
    //                 "column": "payments_companies",
    //                 "colour": "orange"
    //             },
    //             {
    //                 "label": "Opbrengsten",
    //                 "column": "payments_companies",
    //                 "colour": "blue"
    //             },
    //             {
    //                 "label": "Netto",
    //                 "column": "payments_companies",
    //                 "colour": "green"
    //             }
    //         ]
    //     ],
    //     "header": "Betaalstromen Energie Beheer Nederland",
    //     "multiGraph": false,
    //     "functionality": [],
    //     "description": "<p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse pellentesque, est a pulvinar mattis, ligula sapien pellentesque orci, non tincidunt diam erat imperdiet ligula.</p>",
    //     "endpoint": "government_revenue",
    //     "segment": "2022",
    //     "elementClasslist": ['graph-container','graph-container-12']
    // },
];

export default bedrijf;