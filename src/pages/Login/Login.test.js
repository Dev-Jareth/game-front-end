import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-15';
Enzyme.configure({ adapter: new Adapter() })
import {Login} from './';

describe('Login Page',()=>{
    it.skip('should render',()=>{
        // expect(Renderer.create(<Login />)).toMatchSnapshot();
    })
    it('trigger callback on correct details',()=>{
        let mockFunction = jest.fn();
        let wrap = shallow(<Login login={mockFunction}/>)
        // console.log(wrap.find({placeholder:'Username'}).dive().find('input'))
        wrap.find({placeholder:'Username'}).dive().find('input').simulate('change',{target:{value:"Username"}})
        wrap.find({placeholder:'Password'}).dive().find('input').simulate('change',{target:{value:"password"}})
        wrap.find('Button').simulate('click');
        console.log(mockFunction.mock)
        // expect()
    })
})