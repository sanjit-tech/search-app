import React, {Component, Fragment} from "react";
import './../App.css';
import axios from 'axios'
import $ from 'jquery'

class SearchHome extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            search_text: '',
            p_id: '',
            dataList: []
        }

    }
    handleChange = (e) => {
        const {p_id} = this.state
        const { value } = e.target
        if (e.key === 'Enter') {
            let url = `/search-result`
            this.props.history.push({
                pathname: `${url}/`,
                state: { post_id: p_id }
            })
        }
        if (value.length > 3) {
            this.setState({search_text: value}, ()=>{
                this.getSearchData({ search: value })
            })

        }
    };

    getSearchData =({search})=> {
        this.setState({ loading: true })
        let url = `${`http://hn.algolia.com/api/v1/search`}`
        if (search) {
            url += `?query=${search}/`
        }
        axios.get(url)
            .then((response)=>{
                const {data} = response
                const {hits} = data
                this.setState({dataList: hits, p_id: hits[0].objectID})
            })
            .catch(errors => console.log('Not found'))
    }

    render(){
        const {search_text, p_id} = this.state
        console.log('search_text', p_id)
        return(
            <div className="container p-5">
                <div className="row form-box">
                    <div className="col-xl-6">
                        <div className="shadow p-3 mb-5 bg-body rounded">
                            <h2 className="text-center">Search Your Keyword</h2>
                            <div className="input-group mb-3 mt-4">
                                <input type="text" className="form-control" placeholder="Type keyword here..."
                                       aria-label="Recipient's username" aria-describedby="basic-addon2"
                                onChange={(e)=> {this.handleChange(e)}}
                                       onKeyDown={(e)=> {this.handleChange(e)}}
                                />
                                <button className="btn btn-primary"
                                        onClick={() => {
                                            this.props.history.push({
                                                pathname: `${`/search-result`}/`,
                                                state: {post_id: p_id}
                                            })
                                        }}
                                >Search</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default SearchHome
