import { core, elements } from "../../../charts/";
import { DataObject } from '../../shared/types';
import { GroupObject, IGraphMappingV2 } from "../../shared/interfaces";
import { IPageController } from "../../shared/page.controller";
import { BallenbakSimulation } from "../../shared/ballenbak.simulation";
import { HTMLSource} from "../../shared/html/html-source"

import { breakpoints } from '@local/styleguide';


const graphHeight = window.innerWidth < breakpoints.sm ? 320 : 520;

// can this be a wrapper for multiple graphcontrollers?
export  class RevenueCirclesV1 extends core.GraphControllerV3  {

    circles;
    simulation;

    constructor(
        public slug:  string,
        public page: IPageController, 
        public group: GroupObject, 
        public mapping: IGraphMappingV2,
        public segment: string, 
        public index: number
        
        ) {
            super(slug,page,group,mapping,segment) 
            this.pre();
        }

    pre() {

        const bottom = window.innerWidth < breakpoints.sm ? 30 : 90;

        this._addMargin(120,bottom,0,0);
        this._addPadding(0,0,0,0);

        this._addScale('r','log','radius','value');
    }

    html() {

        if(this.group.element == null ) return;

        this.graphEl = super._html();
        
        if(this.graphEl == null) return
            
        this.graphEl.style.height = (window.innerWidth < breakpoints.sm) 
            ? graphHeight.toString() + "px" 
            : graphHeight.toString() + "px";
 

    }

    async init() {

        this.config.minRadius = 32;
        this.config.radiusFactor = window.innerWidth < breakpoints.sm ? 1 : .6;

        await super._init();
        if (this.graphEl != null) await super._svg(this.graphEl);

        this.circles = new elements.ChartCircles(this);
        this.simulation = new BallenbakSimulation(this);

        await this.update(this.group.data,this.segment, false);

        return;
    }

    prepareData(data: DataObject): any {

        return data;
    }

    async draw(data: any) {

        this.scales.r.set(data.graph.map( l => l.value));
        this.circles.draw(data.graph);
        this.simulation.supply(data.graph,"circles")
        
   
    }


    async redraw(data: any, range: number[]) {
     
        await super.redraw(data.graph);

        this.circles.redraw(this.dimensions);
        this.simulation.redraw();
    }

    
    async update(data: DataObject, segment: string, update: boolean, range?: number[]) {
        await super._update(this.group.data,segment,update,range);
    } 
}
