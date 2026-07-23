import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Swal from 'sweetalert2'

import * as ideaService from '../../services/ideaService.js'
import IdeaForm from '../idea-form/IdeaForm.jsx'

export default function IdeaEdit() {
    const { ideaId } = useParams()
    const navigate = useNavigate()

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
            await ideaService.update(ideaId, data)

            await Swal.fire({
                title: '✅ Готово!',
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
