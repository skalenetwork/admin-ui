import { Buffer } from 'buffer';
// import process from 'process';
import assert from 'assert';

window.global = window.global ?? window;
window.Buffer = window.Buffer ?? Buffer;
// window.process = window.process ?? process;

export {};
