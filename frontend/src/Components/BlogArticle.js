const BlogArticle = (props) => {
    return (
        <>
            <tr>
                <td>{props.article.title}</td>
                <td>{props.article.category} </td>
                <td>{props.article.descripcion}</td>
                <td>{props.article.picture}</td>
                <td >Editar</td>
                <td >Borrar</td>
            </tr>
        </>
    )
}

export default BlogArticle