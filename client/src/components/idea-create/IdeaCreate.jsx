import { useNavigate } from 'react-router'
import { useContext } from 'react'
import AuthContext from '../../contexts/AuthContext.jsx'
import Swal from 'sweetalert2'

import * as ideaService from '../../services/ideaService.js'
import IdeaForm from '../idea-form/IdeaForm.jsx'

export default function IdeaCreate() {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext);

    const createIdeaSubmitHandler = async (data) => {
        try {
            const result = await ideaService.create(data, user?.accessToken);

            await Swal.fire({
                title: '✅ Готово!',
                text: `„${result.title}“ беше създадена успешно!`,
            })

            navigate(`/ideas/${result._id}`)
        } catch (err) {
            console.error('Create idea error:', err)

            await Swal.fire({
                title: '❌ Грешка!',
                text: 'Идеята не може да бъде създадена. Опитайте отново.',
            })
        }
    }

    return (
        <IdeaForm
            initialValues={null}
            onSubmit={createIdeaSubmitHandler}
            heading="Добави нова идея"
            helperText="Споделете практична идея за дома. Попълнете полетата по-долу, за да я представите ясно на общността."
            submitLabel="Добави идея"
            cancelTo="/ideas"
        />
    )
}
