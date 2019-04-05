(function () {

    "use strict";
    // to run script after the DOM is loaded
    document.addEventListener("DOMContentLoaded", function() {

        // form submit button
        const trapeziodFormSubmit = document.querySelector("#trapeziumF button");
        trapeziodFormSubmit.addEventListener("click", function (e) {
            // to prevent refreshing
            e.preventDefault();

            const formValue = document.forms.trapeziumForm;
            // fetching the elements
            let x1 = Number(formValue.elements.x1.value),
                y1 = Number(formValue.elements.y1.value),
                x2 = Number(formValue.elements.x2.value),
                y2 = Number(formValue.elements.y2.value),
                x3 = Number(formValue.elements.x3.value),
                y3 = Number(formValue.elements.y3.value),
                x4 = Number(formValue.elements.x4.value),
                y4 = Number(formValue.elements.y4.value);

            // calculating the distance using the distance formula and rounding to 2 decimal places
            const AB = Math.round(Math.sqrt(Math.pow(Math.abs(x1 - x2), 2) + Math.pow(Math.abs(y1 - y2), 2)) * 100)/100;
            const BC = Math.round(Math.sqrt(Math.pow(Math.abs(x3 - x2), 2) + Math.pow(Math.abs(y3 - y2), 2)) * 100)/100;
            const CD = Math.round(Math.sqrt(Math.pow(Math.abs(x3 - x4), 2) + Math.pow(Math.abs(y3 - y4), 2)) * 100)/100;
            const AD = Math.round(Math.sqrt(Math.pow(Math.abs(x1 - x4), 2) + Math.pow(Math.abs(y1 - y4), 2)) * 100)/100;

            // to check intersecting lines
            if(x1 >= x2 || x4 >= x3 || y1 >= y4 || y2 >= y3) {
                alert("Invalid Input! Two non-adjacent lines cannot intersect.");
            }

            // if not intersecting
            else {

                // shifting the x co-ordinates to 1st quadrant
                if(x1 < 0 || x4 < 0) {
                    let min_x = Math.min(x1, x4);
                    x1 -= min_x;
                    x2 -= min_x;
                    x3 -= min_x;
                    x4 -= min_x;
                }

                // shifting the y co-ordinates to 1st quadrant
                if(y1 < 0 || y2 < 0) {
                    let min_y = Math.min(y1, y2);
                    y1 -= min_y;
                    y2 -= min_y;
                    y3 -= min_y;
                    y4 -= min_y;
                }

                // co-ordinates in the 1st quadrant
                console.log(`In Q1 : x1 = ${x1}, y1 = ${y1}`);
                console.log(`In Q1 : x2 = ${x2}, y2 = ${y2}`);
                console.log(`In Q1 : x3 = ${x3}, y3 = ${y3}`);
                console.log(`In Q1 : x4 = ${x4}, y4 = ${y4}`);

                // canvas for ploting the points
                const canvas = document.querySelector("#myDrawing");
                canvas.width = canvas.scrollWidth;
                canvas.height = canvas.scrollHeight;

                // size of the canvas in the viewport
                const disp_area = canvas.width * canvas.height;
                console.log('Canvas area : ', disp_area * 0.25);

                // calculating the size of the rectangle within which the trapezium can be contained
                const maxWidth = Math.max(Math.abs(x1 - x2), Math.abs(x4 - x3), Math.abs(x1 - x3), Math.abs(x4 - x2));
                const maxHeight = Math.max(Math.abs(y1 - y4), Math.abs(y2 - y3), Math.abs(y2 - y4), Math.abs(y1 - y3));
                // area of the smallest rectangle containing the trapezium
                const trapeziumContainerArea = maxWidth * maxHeight;
                console.log('Trapezium max area : ', trapeziumContainerArea);

                // calculating the scaling factor to normalize the dimensions of the trapezium
                const scalingFactor = trapeziumContainerArea / (disp_area * 0.25);
                console.log("scaling factor : ", scalingFactor);

                // normalizing the co-ordinates
                x1 /= Math.sqrt(scalingFactor);
                x2 /= Math.sqrt(scalingFactor);
                x3 /= Math.sqrt(scalingFactor);
                x4 /= Math.sqrt(scalingFactor);
                y1 /= Math.sqrt(scalingFactor);
                y2 /= Math.sqrt(scalingFactor);
                y3 /= Math.sqrt(scalingFactor);
                y4 /= Math.sqrt(scalingFactor);

                // co-ordinates after normalization
                console.log(`After SF x1 = ${x1}, y1 = ${y1}`);
                console.log(`After SF x2 = ${x2}, y2 = ${y2}`);
                console.log(`After SF x3 = ${x3}, y3 = ${y3}`);
                console.log(`After SF x4 = ${x4}, y4 = ${y4}`);

                // for the trapezium shape
                let canvasBody = canvas.getContext('2d');
                // to reset the canvas
                canvasBody.fillStyle = "rgba(255, 0, 0, 0.609)";
                canvasBody.clearRect(0, 0, canvas.width, canvas.height);
                canvasBody.beginPath();
                // changing y coordinates to replicate co-ordinate axis
                // padding of 50 px given for better visibility
                canvasBody.moveTo(50 + x1, canvas.scrollHeight - y1 - 50);
                canvasBody.lineTo(50 + x2, canvas.scrollHeight - y2 - 50);
                canvasBody.lineTo(50 + x3, canvas.scrollHeight - y3 - 50);
                canvasBody.lineTo(50 + x4, canvas.scrollHeight - y4 - 50);
                canvasBody.closePath();
                canvasBody.stroke();
                canvasBody.strokeStyle = "#000";
                canvasBody.fill();

                // trapezium vertex labels
                let canvasLabel = canvas.getContext('2d');
                canvasLabel.fillStyle = "#000";
                canvasLabel.font = "30px Playfair Display, serif";
                canvasLabel.fillText("A", x1 + 25, canvas.scrollHeight - y1 - 25);
                canvasLabel.fillText("B", x2 + 50, canvas.scrollHeight - y2 - 25);
                canvasLabel.fillText("C", x3 + 50, canvas.scrollHeight - y3 - 50);
                canvasLabel.fillText("D", x4 + 25, canvas.scrollHeight - y4 - 50);

                // trapezium sides labels
                let canvasSides = canvas.getContext('2d');
                canvasSides.fillStyle = "#000";
                canvasSides.font = "16px Playfair Display, serif";
                canvasSides.fillText(`${AB} cm`, (x1 + x2)/2, canvas.scrollHeight - (y1 + y2)/2 - 25);
                canvasSides.fillText(`${CD} cm`, (x3 + x4)/2, canvas.scrollHeight - (y3 + y4)/2 - 60);
                canvasSides.fillText(`${BC} cm`, Math.max(x2, x3), canvas.scrollHeight - (y1 + y4)/2 - 55);
                canvasSides.fillText(`${AD} cm`, Math.min(x1, x4), canvas.scrollHeight - (y1 + y4)/2 - 55);

                /*
                vertexBC.translate((x3 + x4)/2 + 25, canvas.scrollHeight/0.8);
                vertexBC.rotate(-Math.PI/2);
                vertexBC.save();
                */
            }
        });

    });

})();