import {Link} from 'react-router-dom'
export const RedirectAuthButton = ({title, redirect}:{title:string, redirect:string}) => {
	return (
		<Link to={redirect} className="bg-[#282d36] font-bold px-5 py-4 rounded-[5px]">
			{title}
		</Link>
	)
}