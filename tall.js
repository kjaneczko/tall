const validate_number = (el, float = false) => {
    if(el.value.length != 0) {
        let value = el.value;
        let value_parts = [0];
        value = value.replace(/[^0-9]+/g, '');
        value = parseInt(value);
        el.value = value;
    }
};
const check_if_empty = (el) => {
    el.value === '' ? this.value = 0 : null;
};
const generate_number = () => {
    const number = random_number();
    document.getElementById('number').innerHTML = number;
    document.getElementById('answer').innerHTML = number == 0 ? number_to_string[0] : generate_text(number);
};
const generate_text_for_big_number = (text, counter) => {
    let big_number_text = "";
    if (counter != 0 && text != "" && text != " ") {
        if(text === "ett" || text === " ett") {
            big_number_text = " " + number_to_string[get_big_number_index[counter]][0];
        }
        else {
            big_number_text = " " + number_to_string[get_big_number_index[counter]][1];
        }
    }
    return big_number_text;
};
const generate_text_for_dozens = (array_representation_of_number, counter = 0) => {
    const number = parseInt(array_representation_of_number[0] + array_representation_of_number[1]);
    let text = "";
    if(number == 0) {
        return text;
    }
    if(number <= 20) {
        text = number_to_string[String(number)];
        return text += generate_text_for_big_number(text, counter);
    }
    const dozens = number_to_string[`${array_representation_of_number[0]}0`];
    const unit = array_representation_of_number[1] != "0" ? ` ${number_to_string[array_representation_of_number[1]]}` : "";
    text = dozens + unit;
    return text += generate_text_for_big_number(text, counter);
};
const generate_text_for_hundreds = (array_representation_of_number) => {
    if(array_representation_of_number[0] == "0") {
        return "";
    }
    return number_to_string[array_representation_of_number[0]] + " hundre";
};
const generate_text_for_number_part = (part, counter, number_length) => {
    const hundreds_text = generate_text_for_hundreds(part.shift());
    const dozens_text = generate_text_for_dozens(part);
    let text = hundreds_text;
    if(counter === 0) {
        if(number_length > 3 && dozens_text.length > 0) {
            text += ` og ${dozens_text}`;
        }
        else {
            if(hundreds_text.length === 0) {
                if(dozens_text.length > 0) {
                    text += ` ${dozens_text}`;
                }
            }
            else if (dozens_text.length > 0 && dozens_text.length > 0) {
                text += ` og ${dozens_text}`;
            }
        }
    }
    else {
        if(dozens_text.length > 0) {
            text += ` ${dozens_text}`;
        }
    }
    return text += generate_text_for_big_number(text, counter);
};
const generate_text = (number) => {
    let array_representation_of_number = number.split("");
    let number_length = array_representation_of_number.length;
    let array_with_text_representation_of_number = [];
    let stop_loop = false;
    let counter = 0;
    do {
        if(number_length > 3) {
            let array_part = array_representation_of_number.splice(number_length - 3, 3);
            array_with_text_representation_of_number.push(generate_text_for_number_part(array_part, counter, number_length));
        }
        else if(number_length === 3) {
            let array_part = array_representation_of_number.splice(number_length - 3, 3);
            array_with_text_representation_of_number.push(generate_text_for_number_part(array_part, counter, number_length));
            stop_loop = true;
        }
        else if(number_length > 0) {
            array_with_text_representation_of_number.push(generate_text_for_dozens(array_representation_of_number, counter));
            stop_loop = true;
        }
        else {
            stop_loop = true;
        }
        number_length -= 3;
        ++counter;
    } while (stop_loop == false);
    array_with_text_representation_of_number.reverse();
    return array_with_text_representation_of_number.join(' ');
};
const random_number = () => {
    const min_el = document.getElementById('min');
    const max_el = document.getElementById('max');
    let min = parseInt(min_el.value);
    let max = parseInt(max_el.value);
    if(min > max) {
        let tmp = min;
        min = max;
        max = tmp;
        min_el.value = min;
        max_el.value = max;
    }
    const random = Math.floor(Math.random() * (max - min + 1) + min);
    return String(random);
};
const number_to_string = {
    0: 'null',
    1: 'ett',
    2: 'to',
    3: 'tre',
    4: 'fire',
    5: 'fem',
    6: 'seks',
    7: 'sju',
    8: 'åtte',
    9: 'ni',
    10: 'ti',
    11: 'elleve',
    12: 'tolv',
    13: 'tretten',
    14: 'fjorten',
    15: 'femten',
    16: 'seksten',
    17: 'sytten',
    18: 'atten',
    19: 'nitten',
    20: 'tjue',
    30: 'tretti',
    40: 'førti',
    50: 'femti',
    60: 'seksti',
    70: 'sytti',
    80: 'åtti',
    90: 'nitti',
    100: 'hundre',
    1000: ['tusen', 'tusen'],
    1000000: ['million', 'millioner'],
    1000000000: ['milliard', 'milliarder'],
    1000000000000: ['billion', 'billioner'],
    1000000000000000: ['billiard', 'billiarder'],
    1000000000000000000: ['trillion', 'trillioner'],
    1000000000000000000000: ['trilliard', 'trilliarder'],
    1000000000000000000000000: ['kvadrillion', 'kvadrillioner'],
    1000000000000000000000000000: ['kvadrilliard', 'kvadrilliarder'],
};
const get_big_number_index = {
    0: null,
    1: 1000,
    2: 1000000,
    3: 1000000000,
    4: 1000000000000,
    5: 1000000000000000,
    6: 1000000000000000000,
    7: 1000000000000000000000,
    8: 1000000000000000000000000,
    9: 1000000000000000000000000000,
};
const display_answer = (display = true) => {
    document.getElementById('show_answer').style.display = display ? "none" : "block";
    document.getElementById('answer').style.display = display ? "block" : "none";
    document.getElementById('new_number').style.display = display ? "block" : "none";
};
document.getElementById('show_answer').addEventListener('click', display_answer);
const new_number = () =>  {
    display_answer(false);
    generate_number(random_number(0,23), random_number(0,59));
};
document.getElementById('new_number').addEventListener('click', new_number);
const keypress_event = (event) => {
    if(event.key === 's' || event.key === 'S') {
        display_answer();
    }
    else if(event.key === 'n' || event.key === 'N') {
        display_answer(false);
        new_number();
    }
};
document.addEventListener('keypress', keypress_event);
new_number();
