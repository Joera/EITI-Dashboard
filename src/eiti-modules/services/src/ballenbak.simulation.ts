// import * as d3 from "d3";
import { BaseType, SimulationLinkDatum, SimulationNodeDatum } from "d3";
import { Circle, Dimensions } from "@local/d3_types";

const forceStrength = 0.125;

export class BallenbakSimulation {

    s: any;

    constructor(private ctrlr: any) {

        this.init()
    }

    init() {

        this.s = window.d3.forceSimulation();
        
        this.s
            .force('charge', window.d3.forceManyBody().strength(forceStrength))
            .force("center", window.d3.forceCenter())
            .force("collide", window.d3.forceCollide().strength(forceStrength))
         //   .force("forceX", d3.forceX().strength(forceStrength))    
    }

    supply(data: any, groupName: string, groupCount?: number) {

        let self = this;
                    
        this.s   
            .nodes(data as SimulationNodeDatum[]);

        this.s    
            .force("collide")
                .strength(forceStrength)
                .radius((d : Circle) => {
                    return self.ctrlr.scales.r.fn(d.value)
                });
        // this.s 
        //     .force("forceX")
        //         .strength(forceStrength);

        this.s 
            .on("tick", (d: Circle) => {

                
                self.ctrlr[groupName].forceDirect()
            }); 

            
        
    }

    restart() {

        // console.log("mo checks");
    
        this.s.alphaTarget(.3).restart;
    }

    redraw() {

        let groupWidth = this.ctrlr.dimensions.width;
        let center = {x: (groupWidth / 2) , y: ((this.ctrlr.dimensions.height / 2) - 50) };

        this.s 
            .force("center")
                .x(center.x)
                .y(center.y);
            
        this.s    
            .force("collide")
                .radius((d : any) => this.ctrlr.scales.r.fn(d.value) + 2);

        // this.s
        //     .force("forceX")
        //         .x(center.x);
        

        this.s.alphaTarget(.3).restart;
    }









}