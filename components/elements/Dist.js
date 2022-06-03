
export default function Dist(props) {
    return <span {...props} className={props?.className + ` bg-orange-200 px-1 `}>{props?.children}</span>
}