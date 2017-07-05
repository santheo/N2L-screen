// var lights = [
//     [false,false,false,false,false,false,false,false],
//     [false,false,false,false,false,false,false,false],
//     [false,false,false,false,false,false,false,false],
//     [false,false,false,false,false,true,false,false],
//     [false,false,false,false,false,false,false,false]
// ];

var data = [
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""]
];

var colors = [
    'red',
    'blue',
    'yellow'
]

var shapes = [
    'sphere',
    'cube',
    'tetra'
]

var makeTable = function(classes, content) {
    var html = '<table>';
    $.each(classes, function(i, value) {
        html += '<tr data-num=' + (i + 1) + '>';
        $.each(value, function(j, value) {
            text = "";
            if (content != null) {
                text = content[i][j];
            }
            // lit = lights[i][j] ? "data-lit" : "";
            lit = "";
            html += '<td data-num=' + (j + 1) + ' ' + lit + ' class="' + value + '">';
            $.each(colors, function(k, color) {
                html += '<div class="' + color + '">'
                $.each(shapes, function(l, shape) {
                    html += '<a class="shape ' + shape + '" href="/"></a>';
                });
                html += '</div>'
            });
            html += '</a></td>';
            // html += '<td class="on ' + value + '">' + text + '</td>';
        });
        html += '</tr>';
    });
    html += '</table>';

    $('.container').html(html);
}

var flip = function(el) {
    $(el).toggleClass(toggleColor);
};

var flipPlus = function(el) {
    var td = $(el).closest('td');
    var tr = $(el).closest('td').parent();
    var tdnum = td.index();
    var trnum = tr.index();

    flip(td);
    flip(td.next());
    flip(td.prev());
    flip(tr.prev().find('td')[tdnum]);
    flip(tr.next().find('td')[tdnum]);
};

var flipX = function(el) {
    var td = $(el).closest('td');
    var tr = $(el).closest('td').parent();
    var tdnum = td.index();
    var trnum = tr.index();

    flip(td);
    flip(tr.prev().find('td')[tdnum-1]);
    flip(tr.prev().find('td')[tdnum+1]);
    flip(tr.next().find('td')[tdnum-1]);
    flip(tr.next().find('td')[tdnum+1]);
};

var flipPerimeter = function(el) {
    var td = $(el).closest('td');
    var tr = $(el).closest('td').parent();
    var tdnum = td.index();
    var trnum = tr.index();

    flip(td.next());
    flip(td.prev());
    flip(tr.prev().find('td')[tdnum]);
    flip(tr.next().find('td')[tdnum]);
    flip(tr.prev().find('td')[tdnum-1]);
    flip(tr.prev().find('td')[tdnum+1]);
    flip(tr.next().find('td')[tdnum-1]);
    flip(tr.next().find('td')[tdnum+1]);
};

var flipExtendedPlus = function(el) {
    var td = $(el).closest('td');
    var tr = $(el).closest('td').parent();
    var tdnum = td.attr('data-num');

    flip(td.siblings());
    flip($('td[data-num=' + tdnum + ']'));
};

var flipExtendedX = function(el) {
    var td = $(el).closest('td');
    var tr = $(el).closest('td').parent();
    var tdnum = parseInt(td.attr('data-num'));
    var trnum = parseInt(tr.attr('data-num'));

    flip(td);
    $.each(Array(8), function(i, n) {
        flip($('tr[data-num=' + (trnum - i) + '] td[data-num=' + (tdnum - i) + ']'));
        flip($('tr[data-num=' + (trnum + i) + '] td[data-num=' + (tdnum - i) + ']'));
        flip($('tr[data-num=' + (trnum - i) + '] td[data-num=' + (tdnum + i) + ']'));
        flip($('tr[data-num=' + (trnum + i) + '] td[data-num=' + (tdnum + i) + ']'));
    });
};

var flipOpposite = function(el) {
    var td = $(el).closest('td');
    var tr = $(el).closest('td').parent();
    var tdnum = parseInt(td.attr('data-num'));
    var trnum = parseInt(tr.attr('data-num'));

    flip($('tr[data-num=' + (8-trnum+1) + '] td[data-num=' + (8-tdnum+1) + ']'));
};


$(function() {
    makeTable(data, content);

    $('.red .sphere').click(function(e) {
        e.preventDefault();
        flip($(this).closest('td'));
    });

    $('.red .cube').click(function(e) {
        e.preventDefault();
        flipX(this);
    });

    $('.red .tetra').click(function(e) {
        e.preventDefault();
        flipPlus(this);
    });

    $('.blue .cube').click(function(e) {
        e.preventDefault();
        flipExtendedX(this);
    });

    $('.blue .tetra').click(function(e) {
        e.preventDefault();
        flipExtendedPlus(this);
    });

    $('.yellow .sphere').click(function(e) {
        e.preventDefault();
        flipPerimeter(this);
    });

    $('.yellow .cube').click(function(e) {
        e.preventDefault();
        flipOpposite(this);
    });
});
