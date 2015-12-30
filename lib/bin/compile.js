#!/usr/bin/env node

import {parse} from 'esprima';
import * as util from 'util';
import Block from '../Block';
import Stack from '../Stack';
import CompilerContext from '../Context';
import Operation from '../Operation';
import known_routes from '../routes';

const routes = new Map();
{
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
    for (const block of Block._all()) {
		console.log(block.toString(true));
	}
}
codegen(inst)