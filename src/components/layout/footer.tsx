import { FacebookIcon, InstagramIcon } from 'lucide-react'

const Footer = () => {
  return (
    <footer className='bg-muted'>
      <table className='mx-auto mb-8 w-full max-w-7xl table-fixed px-4 pt-8 pb-12 sm:px-6'>
        <tbody>
          <tr>
            <td />
            <td className='text-center'>
              <p className='text-muted-foreground whitespace-nowrap'>
                {`©${new Date().getFullYear()}`}{' '}
                <a href='/' className='hover:underline'>
                  Mimóza Memories
                </a>
                , természetes és személyes esküvői dekoráció.
              </p>
            </td>
            <td className='text-right'>
              <div className='inline-flex items-center gap-4'>
                <a
                  href='https://www.facebook.com/mimozadesign'
                  className='hover:text-primary'
                  target='_blank'
                  rel='noreferrer'
                >
                  <FacebookIcon className='size-5' />
                </a>
                <a
                  href='https://www.instagram.com/mimozamemories'
                  className='hover:text-primary'
                  target='_blank'
                  rel='noreferrer'
                >
                  <InstagramIcon className='size-5' />
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </footer>
  )
}

export default Footer
