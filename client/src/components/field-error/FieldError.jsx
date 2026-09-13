export default function FieldError({ message }) {
    if (!message) {
        return null
    }

    return (
        <p role="alert" className="mt-1 text-sm text-red-700">
            {message}
        </p>
    )
}
