// copyright (c) 2022 Cory Ondrejka

import { readFileSync } from 'fs';

let letterCounts = {};

function scoreWords(w1, w2) {
  let score = 0;
  let repeat = {};
  for (let i = 0; i < w1.length; i++) {
    if (w1[i] === w2[i]) {
      score += 10;
    } else {
      for (let j = 0; j < w2.length; j++) {
        if (i !== j) {
          if (!repeat[w1[i]]) {
            if (w1[i] === w2[j]) {
              score += 1;
              repeat[w1[i]] = true;
            }
          }
        }
      }
    }
  }
  return score;
}

function proc(words) {
  let score = {};
  for (let i = 0; i < words.length; i++) {
    score[words[i]] = 0;
    for (let j = 0; j < words.length; j++) {
      if (i !== j) {
        score[words[i]] += scoreWords(words[i], words[j]);
      }
    }
  }
  let sortable = [];
  for (let k in score) {
    sortable.push([k, score[k]]);
  }
  sortable = sortable.sort((a,b) => {
    return b[1] - a[1];
  });

  let deciles = [0,0,0,0,0,0,0,0,0,0];
  let span = sortable.length / 10;
  for (let i = 0; i < sortable.length; i++) {
    deciles[Math.floor(i/span)] += sortable[i][1]/span;
  }

  console.log(deciles);

  for (let i = 0; i < 20; i++) {
    console.log(sortable[i][0] + ': ' + sortable[i][1]);
  }
  for (let i = sortable.length - 20; i < sortable.length; i++) {
    console.log(sortable[i][0] + ': ' + sortable[i][1]);
  }
}


proc(readFileSync(process.argv[2], 'UTF-8').split(/\r?\n/));
