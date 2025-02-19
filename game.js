let move_speed = 5;
let bird = document.querySelector('.bird');
let img = document.querySelector('.bird');
let background = document.querySelector('.background');


let bird_properties = bird.getBoundingClientRect();
let background_properties = background.getBoundingClientRect();

let game_start = 0; // игра не началась
message = document.querySelector('.message');
score_title = document.querySelector('.score_title');
score_value = document.querySelector('.score_value');

let score_value_int = 0;
/* Нажали на Enter, удалили сообщение на главном экране */
document.addEventListener('keydown', (event) => {
    if (event.key == 'ArrowUp' && game_start == 0) {
        /* при перезапуске начинаем с чистого листа */
        document.querySelectorAll('.pipe_sprite').forEach((e) => {
            e.remove();
        });
        message.style.display = 'none';
        score_title.innerHTML = 'Счёт: ';
        score_value.innerHTML = '0';
        game_start = 1;
        play();
    }
})

function play() {
    function move(){
        if(game_start != 1) return;

        let pipe_sprite = document.querySelectorAll('.pipe_sprite');
        pipe_sprite.forEach((element) => {
            let pipe_sprite_properties = element.getBoundingClientRect();
            bird_properties = bird.getBoundingClientRect();

            if(pipe_sprite_properties.right <= 0){
                element.remove();
            }
            else if(bird_properties.left < (pipe_sprite_properties.left + pipe_sprite_properties.width) 
                && (bird_properties.left + bird_properties.width) > pipe_sprite_properties.left && 
                bird_properties.top < (pipe_sprite_properties.top + pipe_sprite_properties.height) && 
                (bird_properties.top + bird_properties.height) > pipe_sprite_properties.top)
                {
                    game_start = 0;
                    message.style.display = 'block';
                    message.style.zIndex = '1';
                    message.style.left = '30vw';
                    message.style.borderRadius = '30%';
                    message.style.padding = '3vw';
                    message.innerHTML = 'Игра окончена.' + '<br> Нажмите <span style="color: red;">&uarr;</span>, <br> чтобы начать заново' + '<br> Ваш результат: ' + score_value_int;
                    score_value_int = 0; // обнуление счётчика при 2 и т.д. попытке
                    return;
                }
            else if(pipe_sprite_properties.right < bird_properties.left && 
                pipe_sprite_properties.right + move_speed >= bird_properties.left && element.increase_score == '1')
                {
                    score_value_int ++;
                    score_value.innerHTML = score_value_int;
                }
                element.style.left = pipe_sprite_properties.left - move_speed + 'px';
        });
        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);
    

    let fly_up = 0;
    function fly() {
        if (game_start == 0) return;
        
        fly_up += 0.5; // птичка вниз

        /* Крылья вниз */
        document.addEventListener('keydown', (event) => {
            if (event.key == 'ArrowUp') {
                img.src = './images/Bird-2.png';
                fly_up = -8; // птичка вверх
            }
        })

        /* Крылья вверх */
        document.addEventListener('keyup', (event) => {
            if (event.key == 'ArrowUp') {
                img.src = './images/Bird.png';
            }
        })

        /* птичка падает на землю */
        if (bird_properties.bottom >= background_properties.bottom) {
            game_start = 0;
            window.location.reload();
            return;
        }
        else if (bird_properties.top <= 0) {
            game_start = 1;
            bird.style.top = 0 +'px';
            bird_properties = bird.getBoundingClientRect();
        }
        bird.style.top = bird_properties.top + fly_up +'px';
        bird_properties = bird.getBoundingClientRect();
        requestAnimationFrame(fly);
    }
    requestAnimationFrame(fly);


    let pipe_separation = 0; /* расстояние между двумя соседними трубами */

    let pipe_gap = 30; /* расстояние между нижней трубой и верхней */

    /* рисуем трубы */
    function create_pipe() {
        if(game_start != 1) return;

        if(pipe_separation > 80){
            pipe_separation = 0;

            let pipe_height = Math.floor(Math.random() * 30);
            let pipe_top = document.createElement('div');
            pipe_top.className = 'pipe_sprite';
            pipe_top.style.top = pipe_height - 70 + 'vh'; 
            //pipe_top.style.left = '100vw';

            document.body.appendChild(pipe_top);
            let pipe_bottom = document.createElement('div');
            pipe_bottom.className = 'pipe_sprite';
            pipe_bottom.style.top = pipe_height + pipe_gap + 'vh';
            //pipe_bottom.style.left = '100vw';
            pipe_bottom.increase_score = '1';

            document.body.appendChild(pipe_bottom);
        }
        pipe_separation++;
        requestAnimationFrame(create_pipe);
    }
    requestAnimationFrame(create_pipe);
}