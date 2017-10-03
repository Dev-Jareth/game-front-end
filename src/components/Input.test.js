import React from 'react';
import Renderer from 'react-test-renderer';
import Enzyme, {shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
Enzyme.configure({ adapter: new Adapter() })
import {Input} from './';

describe('Input Field',()=>{
  it('renders', () => {
    expect(Renderer.create(<Input />)).toMatchSnapshot();
  });
  it('has a placeholder',()=>{
    expect(shallow(<Input placeholder="fakePlaceholder" />).find('input').props()['placeholder']).toBe('fakePlaceholder');
  });
  it('has a value',()=>{
    expect(shallow(<Input value="value" />).find('input').props()['value']).toBe('value');
  });
  it('has an FA icon',()=>{
    expect(Renderer.create(<Input icon="gear" />)).toMatchSnapshot();
  });
  it('accepts an onUpdate function',()=>{
    //Init
    const mockCallback = jest.fn();
    let tree = mount(<Input onUpdate= {mockCallback} />)
    //Alter
    tree.find('input').simulate('change',{target:{value:"H"}})
    //Check
    expect(mockCallback.mock.calls).toMatchSnapshot();
  });
  it('rejects onUpdate non-function',()=>{
    let tree = mount(<Input onUpdate="Hello" />)
    expect(()=>tree.find('input').simulate('change',{target:{value:"H"}})).toThrow(new Error('onUpdate from Input is not a function'));
  })
  it('correctly has error display',()=>{
    expect(shallow(<Input />).find('input').hasClass('error')).toBe(false);
    expect(shallow(<Input error={false} />).find('input').hasClass('error')).toBe(false);
    expect(shallow(<Input error />).find('input').hasClass('error')).toBe(true);
    expect(shallow(<Input error={true} />).find('input').hasClass('error')).toBe(true);
  });
  it('correctly has success display',()=>{
    expect(shallow(<Input />).find('input').hasClass('success')).toBe(false);
    expect(shallow(<Input success={false} />).find('input').hasClass('success')).toBe(false);
    expect(shallow(<Input success />).find('input').hasClass('success')).toBe(true);
    expect(shallow(<Input success={true} />).find('input').hasClass('success')).toBe(true);
  });
  it('correctly has disable display',()=>{
    expect(shallow(<Input />).find('input').hasClass('disabled')).toBe(false);
    expect(shallow(<Input />).find('input').props()['disabled']).toBeFalsy();
    expect(shallow(<Input disabled={false} />).find('input').hasClass('dissabled')).toBe(false);
    expect(shallow(<Input disabled={false} />).find('input').props()['disabled']).toBeFalsy();
    expect(shallow(<Input disabled />).find('input').hasClass('disabled')).toBe(true);
    expect(shallow(<Input disabled />).find('input').props()['disabled']).toBe(true);
    expect(shallow(<Input disabled={true} />).find('input').hasClass('disabled')).toBe(true);
    expect(shallow(<Input disabled={true} />).find('input').props()['disabled']).toBe(true);
  })
  it('can have type',()=>{
    expect(shallow(<Input type="text" />).find('input').props()['type']).toBe('text');
    expect(shallow(<Input type="password" />).find('input').props()['type']).toBe('password');
  })

})
