"use client";

import React, { PropsWithChildren, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export interface DockProps {
  className?: string;
  children: React.ReactNode;
  iconSize?: number;
  iconMagnification?: number;
  iconDistance?: number;
  direction?: "top" | "middle" | "bottom";
  disableMagnification?: boolean;
}

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      iconSize = 40,
      iconMagnification = 60,
      iconDistance = 140,
      direction = "middle",
      disableMagnification = false,
      ...props
    },
    ref,
  ) => {
    const mouseX = useMotionValue(Infinity);

    const renderChildren = () => {
      return React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === DockIcon) {
          return React.cloneElement(child as React.ReactElement<DockIconProps>, {
            mouseX: mouseX,
            size: iconSize,
            magnification: iconMagnification,
            distance: iconDistance,
          });
        }
        return child;
      });
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => {
          if (!disableMagnification) {
            mouseX.set(e.pageX);
          }
        }}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn(
          // Use macos-nav-container for consistent navigation styling - overflow visible for tooltips
          "mx-auto flex h-[68px] w-max gap-4 rounded-3xl px-5 py-3 macos-nav-container",
          {
            "items-start": direction === "top",
            "items-center": direction === "middle",
            "items-end": direction === "bottom",
          },
          className,
        )}
        style={{ overflow: 'visible' }}
        {...props}
      >
        {renderChildren()}
      </motion.div>
    );
  },
);

Dock.displayName = "Dock";

export interface DockIconProps {
  size?: number;
  magnification?: number;
  distance?: number;
  mouseX?: any;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  tooltip?: string;
}

const DockIcon = React.forwardRef<
  HTMLDivElement,
  PropsWithChildren<DockIconProps>
>(
  (
    {
      size = 40,
      magnification = 160,
      distance = 440,
      mouseX,
      className,
      children,
      onClick,
      tooltip,
      ...props
    },
    ref,
  ) => {
    const elementRef = useRef<HTMLDivElement>(null);

    const distanceCalc = useTransform(mouseX, (val: number) => {
      const bounds = elementRef.current?.getBoundingClientRect() ?? {
        x: 0,
        width: 0,
      };

      return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(
      distanceCalc,
      [-distance, 0, distance],
      [size, magnification, size],
    );

    const width = useSpring(widthSync, {
      mass: 0.1,
      stiffness: 150,
      damping: 12,
    });

    return (
      <div className="relative group">
        <motion.div
          ref={(node) => {
            (elementRef as any).current = node;
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              (ref as any).current = node;
            }
          }}
          style={{ width }}
          className={cn(
            // Use nav-item-compact for consistent navigation item styling - circular shape
            "flex aspect-square cursor-pointer items-center justify-center rounded-full nav-item-compact transition-all duration-300 shadow-lg",
            className,
          )}
          onClick={onClick}
          {...props}
        >
          {children}
        </motion.div>
        
        {/* Simple tooltip with group hover */}
        {tooltip && (
          <div className="invisible group-hover:visible absolute left-1/2 transform -translate-x-1/2 top-full mt-2 px-2 py-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs rounded whitespace-nowrap z-[9999] opacity-0 group-hover:opacity-100 transition-all duration-200">
            {tooltip}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-b-[4px] border-transparent border-b-gray-900 dark:border-b-white"></div>
          </div>
        )}
      </div>
    );
  },
);

DockIcon.displayName = "DockIcon";

export { Dock, DockIcon };