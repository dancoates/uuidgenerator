import React from 'react';
import ReactDom from 'react-dom';
import Generator from './generator';

const wrapper = document.getElementById("generator");
wrapper ? ReactDom.render(<Generator/>, wrapper) : false;