import { Buffer } from 'buffer';
import process from 'process';
import assert from 'assert';
import moment from 'moment';

window.global = window.global ?? window;
window.Buffer = window.Buffer ?? Buffer;
window.process = window.process ?? process;
window.moment = moment;

export {};
