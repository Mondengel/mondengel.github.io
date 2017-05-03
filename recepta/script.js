function myRand(min, max, pad) {
    return (Math.floor(Math.random() * (max - min + 1)) + min).toString().padStart(pad, '0');
}

function checksum(number) {
    var result = 0;
    var wages = [7, 9, 1, 3];
    for (i = 0; i < number.length; i++) {
        result += number[i] * wages[i % 4];
    }
    result %= 10;
    return result;
}

$(window).on('load', function () {
    console.log('Window load!');
    //var svg;
    //$('#recepta-rp').on('load', function(e) {
    //    svg = $('#recepta-rp').contents();
    //});
    var svg = document.getElementById('recepta-rp').contentDocument.getElementById('svg');
    var prescriptionNumberSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    prescriptionNumberSvg.setAttribute('id', 'prescription-number-svg');
    svg.appendChild(prescriptionNumberSvg);
    $('#prescription-number-random-button').on('click', function(e) {
        var regionId = $('#region-id').val();
        if (regionId === '00') {
            regionId = myRand(1, 16, 2)
            $('#region-id').val(regionId);
        }
        var number = '02' + regionId + '01000000' + myRand(0, 99999999, 8) + '8';
        number += checksum(number);
        $('#prescription-number').val(number);
    });
    $('#prescription-number-generate-button').on('click', function(e) {
        //var svg = document.getElementById('recepta-rp').contentDocument.getElementById('svg');
        /*var svg = $('#recepta-rp').contents().find('#layer1');;
        var regionId = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        regionId.setAttribute('xml:space', 'preserve');
        regionId.setAttribute('x', 30);
        regionId.setAttribute('y', 30);
        var t=document.createTextNode('Hello World');
        regionId.appendChild(t);
        console.log(regionId);
        svg.append(regionId);*/
        //var draw = SVG.adopt(svg);
        //console.log(svg);
        //var text = draw.text("Lorem ipsum dolor sit amet consectetur.\nCras sodales imperdiet auctor.");
        JsBarcode(prescriptionNumberSvg, $('#prescription-number').val(), {
            format: "ITF",
            height: 35,
            width: 1.3,
            font: 'Arial',
            fontSize: 8,
            textMargin: 4
        });
        prescriptionNumberSvg.setAttribute('x', 45);
        prescriptionNumberSvg.setAttribute('y', 540);
    });
    $('#prescription-number-delete-button').on('click', function(e) {
        prescriptionNumberSvg.innerHTML = '';
    });
});
