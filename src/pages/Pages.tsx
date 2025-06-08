import { BrowserRouter, Route, Routes } from 'react-router-dom';

import RequireAuth from 'components/@route-protection/RequireAuth';

import CollectionCreate from './CollectionCreate';
import CollectionDetail from './CollectionDetail';
import Collections from './Collections';
import Home from './Home';
import Insights from './Insights';
import NotFound from './NotFound';
import ObjectCreate from './ObjectCreate';
import ObjectDetail from './ObjectDetail';
import Objects from './Objects';
import Settings from './Settings';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Pages = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/:collectionId" element={<CollectionDetail />} />
          <Route path="/collections/create" element={<CollectionCreate />} />
          <Route path="/objects" element={<Objects />} />
          <Route path="/objects/:objectId" element={<ObjectDetail />} />
          <Route path="/objects/create" element={<ObjectCreate />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Pages;
