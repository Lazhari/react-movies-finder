'use client'

import { motion, type MotionProps } from 'framer-motion'
import * as React from 'react'

type MotionDivProps = MotionProps & React.HTMLAttributes<HTMLDivElement>

const MotionDivComponent = React.forwardRef<HTMLDivElement, MotionDivProps>(
  (props, ref) => {
    return <motion.div {...props} ref={ref} />
  }
)

MotionDivComponent.displayName = 'MotionDiv'

export const MotionDiv = MotionDivComponent
