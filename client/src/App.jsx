import { Routes, Route } from 'react-router'

import Layout from './components/layout/Layout.jsx'
import Home from './components/home/Home.jsx'
import IdeasCatalog from './components/ideas-catalog/IdeasCatalog.jsx'
import IdeaCreate from './components/idea-create/IdeaCreate.jsx'
import IdeaDetails from './components/idea-details/IdeaDetails.jsx'
import IdeaEdit from './components/idea-edit/IdeaEdit.jsx'
import MyIdeas from './components/my-ideas/MyIdeas.jsx'
import Login from './components/login/Login.jsx'
import Register from './components/register/Register.jsx'
import NotFound from './components/not-found/NotFound.jsx'

export default function App() {

    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/ideas" element={<IdeasCatalog />} />
                <Route path="/ideas/create" element={<IdeaCreate />} />
                <Route path="/ideas/:ideaId" element={<IdeaDetails />} />
                <Route path="/ideas/:ideaId/edit" element={<IdeaEdit />} />
                <Route path="/my-ideas" element={<MyIdeas />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
}
