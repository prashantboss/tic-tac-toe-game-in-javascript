function TicTacToe(selector) {

    var main_element = document.querySelector(selector),
        score_X = main_element.querySelector('.score.X'),
        score_O = main_element.querySelector('.score.O'),
        board = main_element.querySelector('.board'),
        grid_options = main_element.querySelector('.grid-options'),
        reset_btn = main_element.querySelector('.btn-reset');

    var grid_size = 3,
        moves = 0,
        scores = {
            X: 0,
            O: 0
        },
        data = {};

    grid_options.addEventListener('change', function(e){
      grid_size = parseInt(e.target.value);
      init();
    });

    init();

    reset_btn.addEventListener('click', init);

    function paint() {
        var table = '<table>';
        for (var i = 0; i < grid_size; i++) {
            table += '<tr>';
            for (var j = 0; j < grid_size; j++) {
                table += '<td row="' + i + '" column="' + j + '"></td>';
            }
            table += "</tr>";
        }
        board.innerHTML = table;

        var columns = board.getElementsByTagName('td');
        for (i = 0; i < columns.length; i++) {
            columns[i].addEventListener('click', mark);
        }

    }

    function mark(e) {

        var td = e.target;

        if (td.innerHTML) {
            return;
        }

        var row = td.getAttribute('row'),
            column = td.getAttribute('column');

        var current_mark = moves % 2 === 0
            ? 'X'
            : 'O';

        td.innerHTML = current_mark;
        td.classList.add(current_mark);
        data[row + '' + column] = current_mark;

        moves++;

        setTimeout(function() {
            if (didWin(current_mark)) {
                alert(current_mark + ' has won !');
                scores[current_mark]++;
                updateScoreboard();
                empty();
            } else if (moves === Math.pow(grid_size, 2)) {
                alert("It's a draw !");
                empty();
            }
        }, 200);

    }

    function didWin(mark) {

        var vertical_count = 0,
            horizontal_count = 0,
            right_to_left_count = 0,
            left_to_right_count = 0;

        for (var i = 0; i < grid_size; i++) {

            vertical_count = 0;
            horizontal_count = 0;

            for (var j = 0; j < grid_size; j++) {

                if (data[i + '' + j] == mark) {
                    horizontal_count++;
                }

                if (data[j + '' + i] == mark) {
                    vertical_count++;
                }

            }

            if (data[i + '' + i] == mark) {
                left_to_right_count++;
            }

            if (data[(grid_size - 1 - i) + '' + i] == mark) {
                right_to_left_count++;
            }

            if (horizontal_count == grid_size || vertical_count == grid_size) {
                return true;
            }

        }

        if (left_to_right_count == grid_size || right_to_left_count == grid_size) {
            return true;
        }

        return false;
    }

    function empty() {
        moves = 0;
        paint();
        data = {};
    }

    function init() {
        empty();
        scores = {
            X: 0,
            O: 0
        };
        updateScoreboard();
    }

    function updateScoreboard() {
        score_X.innerHTML = scores.X;
        score_O.innerHTML = scores.O;
    }

}
