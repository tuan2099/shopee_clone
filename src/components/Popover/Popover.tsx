import { useFloating, FloatingPortal, arrow, shift, offset } from '@floating-ui/react-dom-interactions'
import React, { useRef, useState, useId } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  classname: string
}
function Popover({ children, renderPopover, classname }: Props) {
  // dùng floating ui sử lý đóng mở hover
  const [open, setOpen] = useState(false)
  const arrowRef = useRef<HTMLElement>(null)
  const { x, y, reference, floating, strategy, middlewareData } = useFloating({
    middleware: [offset(6), shift(), arrow({ element: arrowRef })] // mũi tên popover
  })
  const id = useId()

  const showPopover = () => {
    setOpen(true)
  }
  const hidePopover = () => {
    setOpen(false)
  }
  return (
    <>
      <div
        className={classname}
        ref={reference}
        onMouseEnter={showPopover} // hover hiện popover
        onMouseLeave={hidePopover} // bỏ hover ẩn popover
      >
        {children}
        {/* hover mở popover */}
        <FloatingPortal id={id}>
          <AnimatePresence>
            {open && (
              // motion -> xử lý hiệu ứng
              <motion.div
                initial={{ opacity: 0, transform: 'scale(0)' }}
                animate={{ opacity: 1, transform: 'scale(1)' }}
                exit={{ opacity: 0, transform: 'scale(0)' }}
                transition={{ duration: 0.2 }}
                ref={floating}
                style={{
                  position: strategy,
                  top: y ?? 0,
                  left: x ?? 0,
                  width: 'max-content',
                  transformOrigin: `${middlewareData.arrow?.x}px top` // lấy ra vị trí mũi tên để scale
                }}
              >
                <span
                  ref={arrowRef}
                  className='absolute z-10 translate-y-[-99%] border-[11px] border-x-transparent border-t-transparent border-b-white'
                  style={{ top: middlewareData.arrow?.y, left: middlewareData.arrow?.x }} // arrow
                ></span>
                {renderPopover}
              </motion.div>
            )}
          </AnimatePresence>
        </FloatingPortal>
        {/* hover mở popover */}
      </div>
    </>
  )
}

export default Popover
