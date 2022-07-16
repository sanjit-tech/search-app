import React, {Component, Fragment} from "react";
import './../App.css';
import axios from 'axios'

class SearchResult extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            searched_data: [],
        }

    }
    componentDidMount() {
        this.getSearchDataResult()
    }

    getSearchDataResult =()=> {
        this.setState({ loading: true })
        let url = `${`http://hn.algolia.com/api/v1/items/12701272`}`
        axios.get(url)
            .then((response)=>{
                const {data} = response
                this.setState({searched_data: data})
            })
            .catch(errors => console.log('Not found'))
    }

    render(){
        const {searched_data} = this.state
        console.log('search_text', searched_data)
        return(
            <div className="container p-5">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="shadow p-3 mb-5 bg-body rounded">
                            <h2 className="text-center">Search Result</h2>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default SearchResult
