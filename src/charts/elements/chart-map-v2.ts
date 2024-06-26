// import * as d3 from "d3";
import { colours,breakpoints } from '@local/styleguide';
import { convertToCurrency, slugify, thousands } from '@local/d3-services';
import { EitiData, GraphData } from "@local/d3_types";

export  class ChartMapV2   {
    projection;
    path;
    projector;

    constructor(
        private ctrlr,
    ) {
        this.init();
    }


    init() {

        this.projection = window.d3.geoMercator();
        this.path = window.d3.geoPath()
            .projection(this.projection);

        var b = [
                [0.114, -1.101],
                [0.12022108488117365, -1.105]
            ],
            s = .07 / Math.max((b[1][0] - b[0][0]) / this.ctrlr.dimensions.svgWidth, (b[1][1] - b[0][1]) / this.ctrlr.dimensions.height),
            t: [number, number] = [((this.ctrlr.dimensions.svgWidth - s * (b[1][0] + b[0][0])) / 2) + 100, ((this.ctrlr.dimensions.height - s * (b[1][1] + b[0][1])) / 2)  - 60];


        this.projection
            .scale(s)
            .translate(t)
        ;

       

        this.ctrlr.svg.nlGroup = this.ctrlr.svg.layers.data
            .append("g")
            .attr("class","netherlands")

        this.ctrlr.svg.featureGroup = this.ctrlr.svg.layers.data
            .append("g")
            .attr("class","areas")
    }


    draw(data: any[][]) {
        
        let self = this;
        
        this.ctrlr.svg.nlPaths = this.ctrlr.svg.nlGroup
            .selectAll("path.nl")
            .data(data['nl_features'], d => slugify(d.properties.name))
            .join("path")
            .attr("class", (d: any, i: number) => 'nl ' + slugify(d.properties.name))
            .attr("d", this.path)
            .attr("fill", "#fff")
            .attr("stroke", "#000")
            ;

        this.ctrlr.svg.features = this.ctrlr.svg.featureGroup
            .selectAll("path.area")
            .data(data['features'], d => slugify(d.properties.licenced_a))
            .join("path")
            .attr("class", (d: any, i: number) => 'area ' + slugify(d.properties.licenced_a))
            .attr("d", this.path)
            .attr("fill", colours["gray"][1])
            .attr("stroke", colours["gray"][0])
            ;
    }

    redraw(property,colour) {

        let self = this;

        this.ctrlr.svg.features
            .attr("fill", d => {
                const c = (colour) ? colour : d.properties.colour;
                return (property !== undefined && d.properties[property] > 0) ? (colours[c][0] || colours[c][0] ): '#eee'
            } )
            .attr("fill-opacity", (d) => (d.properties[property] > 0) ? this.ctrlr.scales.y.scale(d.properties[property]) : 1)
            .on("mouseover", function (event: any, d: any) {

                if(d.properties[property] && d.properties[property] > 0) {

                    let html = "<div>" + d.properties.licence_nm + "</div><div>" + d.properties.meta.origin_name + "</div><div>&euro;" + thousands(d.properties[property]) + "</div>";

                    window.d3.select(event.target)
                        .attr("fill-opacity", 1);

                    window.d3.select('.tooltip')
                        .html(html)
                        .style("left", (event.pageX + 5) + "px")
                        .style("top", (event.pageY - 5) + "px")
                        .transition()
                        .duration(250)
                        .style("opacity", 1);
                }
            })
            .on("mouseout", function (event, d) {

                window.d3.select(event.target)
                    .attr("fill-opacity", (e: any) => (e.properties[property] > 0) ? self.ctrlr.scales.y.fn(d.properties[property]) : 1)

                window.d3.select('.tooltip')
                    .transition()
                    .duration(250)
                    .style("opacity", 0);
            });

    }
}
