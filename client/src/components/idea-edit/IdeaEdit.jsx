import { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router'
import Swal from 'sweetalert2'

import * as ideaService from '../../services/ideaService.js'
import IdeaForm from '../idea-form/IdeaForm.jsx'
import AuthContext from '../../contexts/AuthContext.jsx'

export default function IdeaEdit() {
    const { ideaId } = useParams()
    const navigate = useNavigate()

    const { user } = useContext(AuthContext);
    const accessToken = user?.accessToken;

    const [idea, setIdea] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        let ignore = false

        ideaService.getById(ideaId)
            .then((result) => {
                if (ignore) return

                if (result && result._id) {
                    setIdea(result)
                } else {
                    setError('Идеята не съществува или не може да бъде заредена.')
                }
            })
            .catch(() => {
                if (!ignore) {
                    setError('Идеята не съществува или не може да бъде заредена.')
                }
            })
            .finally(() => {
                if (!ignore) {
                    setIsLoading(false)
                }
            })

        return () => {
            ignore = true
        }
    }, [ideaId])

    const editIdeaSubmitHandler = async (data) => {
        try {
            await ideaService.update(ideaId, data, accessToken);

            await Swal.fire({
                title: '✅ Успех!',
                text: 'Промените бяха запазени успешно!',
            })

            navigate(`/ideas/${ideaId}`)
        } catch (error) {
            await Swal.fire({
                title: '❌ Грешка!',
                text: error.message || 'Промените не могат да бъдат запазени. Опитайте отново.',
            })
        }
    }

    if (isLoading) {
        return <p className="text-slate-600">Зареждане на идеята…</p>
    }

    if (error) {
        return (
            <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                {error}
            </p>
        )
    }

    const isOwner = user && idea && user._id === idea._ownerId;

    if (!isOwner) {
        return <Navigate to={`/ideas/${ideaId}`} replace />
    }

    return (
        <IdeaForm
            initialValues={idea}
            onSubmit={editIdeaSubmitHandler}
            heading="Редактирай идея"
            helperText="Обновете полетата на идеята и запазете промените."
            submitLabel="Запази промените"
            cancelTo={`/ideas/${ideaId}`}
        />
    )
}
