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
    expect(Renderer.create(<Input placeholder="placeholder" />)).toMatchSnapshot();
  });
  it('has a value',()=>{
    expect(Renderer.create(<Input value="value" />)).toMatchSnapshot();
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
    expect(shallow(<Input />).find('input').hasClass('error')).toMatchSnapshot();
    expect(shallow(<Input error={false} />).find('input').hasClass('error')).toMatchSnapshot();
    expect(shallow(<Input error />).find('input').hasClass('error')).toMatchSnapshot();
    expect(shallow(<Input error={true} />).find('input').hasClass('error')).toMatchSnapshot();
  });
  it('correctly has success display',()=>{
    expect(shallow(<Input />).find('input').hasClass('success')).toMatchSnapshot();
    expect(shallow(<Input success={false} />).find('input').hasClass('success')).toMatchSnapshot();
    expect(shallow(<Input success />).find('input').hasClass('success')).toMatchSnapshot();
    expect(shallow(<Input success={true} />).find('input').hasClass('success')).toMatchSnapshot();
  });
  it('correctly has disable display',()=>{
    expect(shallow(<Input />).find('input').hasClass('disabled')).toMatchSnapshot();
    expect(shallow(<Input />).find('input').props()['disabled']).toMatchSnapshot();
    expect(shallow(<Input disabled={false} />).find('input').hasClass('dissabled')).toMatchSnapshot();
    expect(shallow(<Input disabled={false} />).find('input').props()['disabled']).toMatchSnapshot();
    expect(shallow(<Input disabled />).find('input').hasClass('disabled')).toMatchSnapshot();
    expect(shallow(<Input disabled />).find('input').props()['disabled']).toMatchSnapshot();
    expect(shallow(<Input disabled={true} />).find('input').hasClass('disabled')).toMatchSnapshot();
    expect(shallow(<Input disabled={true} />).find('input').props()['disabled']).toMatchSnapshot();
  })
  it('can have type',()=>{
    expect(shallow(<Input type="text" />).find('input').props()['type']).toMatchSnapshot();
    expect(shallow(<Input type="password" />).find('input').props()['type']).toMatchSnapshot();
  })

})
