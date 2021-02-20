
import HeaderImg from '../Components/HeaderImg'
import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import articleActions from '../redux/actions/articleActions'
import LastArticles from '../Components/LastArticles'
import petitionsActions from '../redux/actions/petitionsActions'
import LastPetitions from '../Components/LastPetitions'
import Footer from '../Components/Footer'

const HomePage = (props) => {

    useEffect(() => {
        props.getArticles()
        props.getPetitions()
    }, [])
    return (
        <>
            <HeaderImg />
            <div className="containerHome">
                <div className="containerBanner">
                    <h2>CONTRIBUTE ON CAUSES BY SIGNING PETITIONS, WE NEED YOU TO BE PART.</h2>
                </div>
                <div className="lastArticlesCreated">
                    <h2>Last Articles Created</h2>
                </div>
                <div className="divBlog">
                    {props.lastArticles.map(lastArticle => <LastArticles key={lastArticle._id} lastArticle={lastArticle} />)}
                    <div className="lastPetitionsCreated">
                        <h2>Last Petitions Created</h2>
                    </div>
                    {props.lastPetitions.map(lastPetition => <LastPetitions key={lastPetition._id} lastPetition={lastPetition} />)}
                    <div className="white">
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        lastArticles: state.articleR.lastArticles,
        lastPetitions: state.petitionsR.lastPetitions
    };
};

const mapDispatchToProps = {
    getArticles: articleActions.getArticles,
    getPetitions: petitionsActions.getPetitions
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

