import React from 'react'
import { useTranslation } from 'react-i18next'
import { Tabtitle, Container, Form } from '../components';

const AdminPage = () => {

  const { t } = useTranslation()
  
  Tabtitle(t("addProduct"))

  return (
    <Container>
      <div className='w-full min-h-screen py-3 flex justify-center relative'>
        <div className='w-1/2 lg:w-3/4 md:w-full'>
          <Form type='add'/>
        </div>
      </div>
    </Container>
  )
}

export default AdminPage