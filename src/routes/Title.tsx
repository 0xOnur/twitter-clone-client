import React from 'react'
import Helmet from "react-helmet";

interface IProps {
    title: string;
}

const Title = ({title}: IProps) => {
    const defaultTitle = "/ Twitter"
  return (
    <Helmet>
        <title>{title ? title : defaultTitle}</title>
    </Helmet>
  )
}

export default Title