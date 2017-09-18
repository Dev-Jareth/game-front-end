import React from 'react';
import Renderer from 'react-test-renderer';
import {Input} from './';

describe('Input Field',()=>{
  it('renders', () => {
    expect(Renderer.create(<Input />)).toMatchSnapshot();
  });
  it('has a placeholder',()=>{
    expect(Renderer.create(<Input placeholder="placeholder" />)).toMatchSnapshot();
  });
  it('has a value',()=>{
    expect(Renderer.create(<Input value="value" />)).toMatchSnapshot();
  });
  it('has an FA icon',()=>{
    expect(Renderer.create(<Input icon="gear" />)).toMatchSnapshot();
  });
  it('accepts an onUpdate function',()=>{
    expect(Renderer.create(<Input onUpdate= {val=>{console.log(val)}} />)).toMatchSnapshot();
  });
  it('rejects onUpdate non-function',()=>{
    fail('not implemented')
  })
  it('can error',()=>{
    expect(Renderer.create(<Input error />)).toMatchSnapshot();
    expect(Renderer.create(<Input error={true} />)).toMatchSnapshot();
  });
  it('can success',()=>{
    expect(Renderer.create(<Input success />)).toMatchSnapshot();
    expect(Renderer.create(<Input success={true} />)).toMatchSnapshot();
  });
  it('can disable',()=>{
    expect(Renderer.create(<Input disabled />)).toMatchSnapshot();
    expect(Renderer.create(<Input disabled={true} />)).toMatchSnapshot();
  })
  it('can have type',()=>{
    expect(Renderer.create(<Input type="text" />)).toMatchSnapshot();
    expect(Renderer.create(<Input type="password" />)).toMatchSnapshot();
  })

})
