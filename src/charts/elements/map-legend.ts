// import * as d3 from "d3";
import { GeoData } from "@local/d3_types";
import { colours, breakpoints } from "@local/styleguide";

export class MapLegend {

    constructor(
        private ctrlr
    ) {

    }
    draw(data: any, yParameter: string) {

        let bar =  document.createElement('div');
        bar.style.display = 'flex';
        bar.style.flexDirection = 'column';
        bar.style.position ='absolute';
        bar.style.left = (window.innerWidth > breakpoints.sm && window.innerWidth < breakpoints.bax) ? "3rem" : ".75rem";
        bar.style.top = window.innerWidth > breakpoints.sm ? "calc(50% - 100px)" : "calc(50% - 80px)"
        bar.style.height = window.innerWidth > breakpoints.sm ? '200px' : '160px';
        bar.style.width = '.75rem';
        bar.style.background = '#eee';
        bar.style.borderTop = '1px solid black';
        bar.style.borderBottom = '1px solid black';
      //  bar.style.marginTop = '1.5rem';

        let max = window.d3.max(data.features.map( f => f.properties[this.ctrlr.parameters.y]));

        if(max == undefined) return; 

        let topSpan = document.createElement('span');
        topSpan.innerText = max;
        topSpan.style.fontSize = '0.7rem';
        topSpan.style.height = '0';
        topSpan.style.alignSelf ='flex-start';
        topSpan.style.marginLeft = '1rem';
        topSpan.style.marginTop = '-.35rem';
        topSpan.style.marginBottom = '.35rem';
        bar.appendChild(topSpan);

        let bottomSpan = document.createElement('span');
        bottomSpan.innerText = '0';
        bottomSpan.style.fontSize = '0.7rem';
        bottomSpan.style.height = '0';
        bottomSpan.style.alignSelf ='flex-start';
        bottomSpan.style.marginLeft = '1rem';
        bottomSpan.style.marginTop= '-.35rem';

        let inner =  document.createElement('div');
        inner.style.height = '100%';

        let gradient = 'linear-gradient(0deg, ' + colours.lightBlue[3] + ' 0%,' + colours[this.ctrlr.mapping.parameters[0][0].colour][0] + ' 100%)';
        inner.style.background = gradient + ' no-repeat';

        bar.appendChild(inner);
        bar.appendChild(bottomSpan);

        return bar;
    }



}