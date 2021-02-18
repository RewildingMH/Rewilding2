
import HeaderImg from '../Components/HeaderImg'
import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import articleActions from '../redux/actions/articleActions'

const HomePage = (props) => {
    console.log(props)

    useEffect(() => {
        props.getArticles()
    }, [])

    return (
        <>
        <HeaderImg/>
        <div className="containerHome">
                <div className="containerBanner">
                    <h2>CONTRIBUTE ON CAUSES BY SIGNING PETITIONS, WE NEED YOU TO BE PART.</h2>
                </div>
                <div className="divBlog">
                    {/* {props.lastArticles.map(article => )} */}
                </div>
        </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        lastArticles: state.articleR.lastArticles
    };
};

const mapDispatchToProps = {
    getArticles: articleActions.getArticles
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

