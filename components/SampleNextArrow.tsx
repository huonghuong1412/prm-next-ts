import { ChevronRightIcon } from '@heroicons/react/outline';
function SampleNextArrow(props: any) {
    const { onClick } = props;
    return (
        <button className="p-2 md:p-2 lg:p-3 flex bg-slate-200 justify-center shadow items-center absolute -right-9 rounded-full top-[44%] md:top-[44%] lg:top-[45%]" onClick={onClick}>
            <ChevronRightIcon className="w-6 h-6 text-gray-700" />
        </button>
    );
}
export default SampleNextArrow