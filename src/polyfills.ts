import { Buffer } from 'buffer';
import process from 'process';

window.global = window.global ?? window;
window.process = window.process ?? process;
window.Buffer = window.Buffer ?? Buffer;

export {};
