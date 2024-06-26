// import * as d3 from "d3";
import {EitiData, IGraphMapping, ResponseData} from "@local/d3_types";
import { IDashboardController } from "@local/dashboard";
import { charts } from "@local/charts";
// moet dit niet in eiti-module ??
import { createGraphGroupElement } from "@local/dashboard/html.factory";
import { netherlands } from "@local/eiti-services/src/netherlands.geodata";
// import { licences2023 } from "./licences2023.geodata";
 
export interface IDataService {

    data: EitiData,
    ctrlr: IDashboardController,
    call: (pageConfig: IGraphMapping[], segment: string, update: boolean, htmlContainer: HTMLElement) => void 
    _createEtiApiCalls: (pageConfig: IGraphMapping[], segment: string, update: boolean) => any[],
    _mergeArrayObjects: (any) => any,
    graphMethods: any
}

export class DataService implements IDataService {

    data: any; 
    graphMethods = {}

    constructor(public ctrlr) {}

    async call(pageConfig, segment: string, update: boolean, htmlContainer: HTMLElement) : Promise<void> {
   
        const promises = this._createEtiApiCalls(pageConfig, segment, false);

        await setTimeout( async () => { 
    
            return await Promise.all(promises).then( async(values) => {
        
                this.data = this._mergeArrayObjects(values);         
            
                for (let graphMapping of pageConfig) {

                    if (graphMapping.segment != null) {
                        segment = graphMapping.segment;
                    }

                    const element = createGraphGroupElement(graphMapping, htmlContainer);

                    this.graphMethods[graphMapping.slug] = new charts[graphMapping.graph](this.ctrlr, Object.assign({}, this.data), element, graphMapping, segment);
                    // console.log(this.data);
                    await this.graphMethods[graphMapping.slug].init();   
                }
            });

        },10);

        return;
    }

    _createEtiApiCalls(pageConfig, segment, update) {

        let self = this;
        let promises = [];
        let uniqueEndpoints: string[] = ["payments","reconciliation","entities","economy","licences"] 
        
        for (let endpoint of uniqueEndpoints) {
    
            if(endpoint) {

                // do it one by one .. but check if store in local s
                // bundle per page? 
                // smarter lazy loading
                /// separate the geodata
                // split definitions

                let url;

                switch (endpoint) {

                    case 'payments': 
                    
                        url = './payments.json' 
                        break;

                    case 'licences': 
                        url = './licences2023.geojson' 
                        break;

                    default: 
                        // @ts-ignore
                        url = DOMAIN + APIBASE + endpoint;
                        break;
                }


                promises.push(
                    new Promise((resolve, reject) => {
                        window.d3.json<ResponseData>(url)
                            .then((data) => {
                                resolve(data)
                            })
                            .catch((err) => {
                                console.log('api call failed');
                                console.log(err);
                            })
                    })
                )
            }
        }
        return promises;
    }

    _

    _mergeArrayObjects(values:any): EitiData {

        if (this.ctrlr.params.topic == 'bedrijf') {
            values[0] = values[0].filter( i => (i.origin === this.ctrlr.params.company || i.recipient == this.ctrlr.params.company) && !i.aggregated);
        }

        return {
            'payments' : values[0],  
            'reconciliation': values[1],
            'entities': values[2],
            'economy': values[3],
            // 'licences': values[3],
            'geodata': {
                // fallowAreas2018,
                // fallowAreas2023,
                // facilities,
                licences2023: values[4],
                netherlands
            }
            


        }
    }
}
