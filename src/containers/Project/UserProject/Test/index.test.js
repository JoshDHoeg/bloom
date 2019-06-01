import React from 'react';
import { shallow } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router'
import { Route } from 'react-router-dom';

import { UserProject } from '../UserProject.jsx';
import {mount} from "enzyme/build/index";
import Firebase from '../../../../utilities/Firebase';
import { Concept } from '../Concept/Concept';

// export function renderWithRouter(Component, props) {
//     const config = makeRouteConfig(
//         <Route path='/project/user_concept'
//                render={() => React.createElement(Component, props)}
//         />
//     );
//
//     return getResult({ // promise
//         url: "/project/user_concept",
//         routeConfig: config,
//         render: createRender({})
//     }).then(result => TestRenderer.create(result.element));
// }
//
// it('snapshot', () => {
//     // Catch a rejected promise by looking for a certain number of assertions
//
//     return renderWithRouter().then(tree => {
//         expect(tree.toJSON()).toMatchSnapshot()
//     })
// });


describe('Project Page Test', () => {
    const f = new Firebase();

    it('renders without crashing',() => {
        shallow(<UserProject/>)
    });


    it('Edit Props initiallized?', () => {
        const w = mount(<UserProject/>);
        const temp = w.find('Route[path="/project/user_concept"]').at(0).props().render();
        console.log(temp.props.edit);
        expect(temp.props.edit).toEqual(false);

        //.toEqual(<Main uid={wrapper.state('uid')} />)

    });
});
