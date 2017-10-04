import React from 'react';
import Renderer from 'react-test-renderer';
import Enzyme, {shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import {MemoryRouter as R} from 'react-router-dom';
Enzyme.configure({ adapter: new Adapter() })
import {Button} from './';

describe('Button',()=>{
    it('renders',()=>{
        expect(Renderer.create(<R><Button>Button Text</Button></R>)).toMatchSnapshot();
    })
    
  it('correctly has error display',()=>{
    expect(shallow(<Button />).hasClass('error')).toBe(false);
    expect(shallow(<Button error={false} />).hasClass('error')).toBe(false);
    expect(shallow(<Button danger={false} />).hasClass('error')).toBe(false);
    expect(shallow(<Button error />).hasClass('error')).toBe(true);
    expect(shallow(<Button danger />).hasClass('error')).toBe(true);
    expect(shallow(<Button error={true} />).hasClass('error')).toBe(true);
    expect(shallow(<Button danger={true} />).hasClass('error')).toBe(true);
  });
  it('correctly has success display',()=>{
    expect(shallow(<Button />).hasClass('success')).toBe(false);
    expect(shallow(<Button success={false} />).hasClass('success')).toBe(false);
    expect(shallow(<Button success />).hasClass('success')).toBe(true);
    expect(shallow(<Button success={true} />).hasClass('success')).toBe(true);
  });
  it('correctly has warning display',()=>{
    expect(shallow(<Button />).hasClass('warning')).toBe(false);
    expect(shallow(<Button warning={false} />).hasClass('warning')).toBe(false);
    expect(shallow(<Button warning />).hasClass('warning')).toBe(true);
    expect(shallow(<Button warning={true} />).hasClass('warning')).toBe(true);
  });
  it('correctly has info display',()=>{
    expect(shallow(<Button />).hasClass('info')).toBe(false);
    expect(shallow(<Button info={false} />).hasClass('info')).toBe(false);
    expect(shallow(<Button info />).hasClass('info')).toBe(true);
    expect(shallow(<Button info={true} />).hasClass('info')).toBe(true);
  });
  it('correctly has block display',()=>{
    expect(shallow(<Button />).hasClass('block')).toBe(false);
    expect(shallow(<Button block={false} />).hasClass('block')).toBe(false);
    expect(shallow(<Button block />).hasClass('block')).toBe(true);
    expect(shallow(<Button block={true} />).hasClass('block')).toBe(true);
  });
  it('correctly has disable display',()=>{
    expect(shallow(<Button />).props()['disabled']).toBeFalsy();
    expect(shallow(<Button disabled={false} />).props()['disabled']).toBeFalsy();
    expect(shallow(<Button disabled />).props()['disabled']).toBe(true);
    expect(shallow(<Button disabled={true} />).props()['disabled']).toBe(true);
  })
  it('accepts an onUpdate function',()=>{
    //Init
    const mockCallback = jest.fn();
    let tree = shallow(<Button onClick= {mockCallback} />)
    //Alter
    tree.simulate('click')
    //Check
    expect(mockCallback.mock.calls.length).toMatchSnapshot();
  });
  it('accepts TO parameter',()=>expect(shallow(<Button to="fakePath" />).props()['to']).toBe('fakePath'));
  it('correctly handles sizes',()=>{
    expect(shallow(<Button size='large' />).hasClass('large')).toBe(true);
    expect(shallow(<Button size='small' />).hasClass('small')).toBe(true);
    expect(shallow(<Button size='huge' />).hasClass('huge')).toBe(true);
  })
  it('correctly has wide display',()=>{
    expect(shallow(<Button />).hasClass('wide')).toBe(false);
    expect(shallow(<Button wide={false} />).hasClass('wide')).toBe(false);
    expect(shallow(<Button wide />).hasClass('wide')).toBe(true);
    expect(shallow(<Button wide={true} />).hasClass('wide')).toBe(true);

  })
})