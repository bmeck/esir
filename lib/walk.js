import {parse} from 'esprima';
import * as util from 'util';
import Block from './Block';
import Stack from './Stack';
import CompilerContext from './Context';
import Operation from './Operation';


const routes = new Map();
{
	const known_routes = require('./routes');
	for (const name of Object.keys(known_routes)) {
		routes.set(name, known_routes[name].default);
	}
}

function dump(code) {
	const ast = parse(code);
	const ctx = new CompilerContext();
	const _start = new Block();
	ctx.stacks.get('block').push(_start);
	for (let x of walk(ast, ctx));
	return _start;
}

function* walk(node, ctx) {
  if (!routes.has(node.type)) {
	throw new Error(`unknown node type ${node.type}`)
  }
  const route = routes.get(node.type);
  const children = route.walk;
  if (children) {
  	for (let child of children(node, ctx)) {
		  for (let _ of walk(child, ctx));
	  }
  }
}
const inst = dump(process.argv[2]);
function codegen(block) {
	const visited = new Set();
	const to_visit = [block];
	while (to_visit.length) {
		const needle = to_visit.shift();
		if (visited.has(needle.id)) continue;
		visited.add(needle.id);
		
		console.log(needle.toString());
		
		if (needle.jmpTrue && !visited.has(needle.jmpTrue.id)) {
			to_visit.push(needle.jmpTrue);
		}
		if (needle.jmpFalse && !visited.has(needle.jmpFalse.id)) {
			to_visit.push(needle.jmpFalse);
		}
	}
}
codegen(inst)