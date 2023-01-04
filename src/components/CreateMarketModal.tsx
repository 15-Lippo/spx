import React, { useState } from 'react'
import {
  Stack,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Heading,
  useColorModeValue,
  HStack,
  Image,
  Text,
  keyframes,
  FormErrorMessage,
  ModalOverlay, ModalBody, ModalHeader, ModalContent, ModalCloseButton,
  Select,
  Textarea,
} from '@chakra-ui/react'
import { Select as ReactSelect, chakraComponents, ChakraStylesConfig } from 'chakra-react-select'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import useMeasure from 'react-use-measure'
import { Field, Form, Formik } from 'formik'
import * as yup from "yup"
import { createVerboseMarket } from '@/utils/utils'

import styles from '@/styles/Home.module.css'

const categories = ['Financials', 'Economics', 'Crypto', 'Climate', 'Other']

const Form1 = () => {
  return (
    <>
    <Field name="title">
      {({ field, form }) => (
      <FormControl isInvalid={form.errors.title && form.touched.title}>
        <FormLabel htmlFor="title" fontWeight={'normal'}>
          Title
        </FormLabel>
        <Input {...field} id="title" placeholder=" " />
        <FormErrorMessage>{form.errors.title}</FormErrorMessage>
        <FormHelperText textAlign={"end"}>Keep it short and sweet!</FormHelperText>
      </FormControl>
      )}
    </Field>
    
    <Field name="category">
      {({ field, form }) => (
      <FormControl cursor={"text"} isInvalid={form.errors.category && form.touched.category}>
        <FormLabel htmlFor="category" fontWeight={'normal'}>
          Category
        </FormLabel>
        <Select {...field} placeholder={"-"}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
        <FormErrorMessage>{form.errors.category}</FormErrorMessage>
      </FormControl>
      )}
    </Field>

    <Field name="lockTimestamp">
      {({ field, form }) => (
      <FormControl id="lockTimestamp" isInvalid={form.errors.lockTimestamp && form.touched.lockTimestamp}>
        <FormLabel htmlFor="title" fontWeight={'normal'} mt={"5%"}>
          Resolution date
        </FormLabel>
        <Input {...field} type={"datetime-local"}/>
        <FormErrorMessage>{form.errors.lockTimestamp}</FormErrorMessage>
      </FormControl>
      )}
    </Field>
    </>
  )
}

const Form2 = ({ title }) => {
  return (
    <>
    <Heading fontWeight={"medium"} size={'md'}>{title}</Heading>
    <Field name="resolutionCriteria">
      {({ field, form }) => (
      <FormControl isInvalid={form.errors.resolutionCriteria && form.touched.resolutionCriteria}>
        <FormLabel htmlFor="resolutionCriteria" fontWeight={'normal'}>
          Description
        </FormLabel>
        <Textarea {...field} id="resolutionCriteria" placeholder="This market resolves if..." />
        <FormErrorMessage>{form.errors.resolutionCriteria}</FormErrorMessage>
        <FormHelperText textAlign={"end"}>Be clear and objective!</FormHelperText>
      </FormControl>
      )}
    </Field>

    </>
  )
}

export const CreateMarketModal = () => {
  let duration = 0.5;

  const validationSchema = yup.object().shape({
    title: yup.string().required("Market title is required"),
    category: yup.string().required("Market category is required"),
    lockTimestamp: yup.date().min(new Date(), 'Resolution date must be in the future').required(),
    resolutionCriteria: yup.string().required("Resolution criteria is required")
  })
  
  return (
    <MotionConfig transition={{ duration, type: "tween" }}>
      <ModalOverlay backdropFilter='auto' backdropBlur='2px' />
      <ModalContent p={'12px 15px'} rounded={'2xl'} boxShadow={"2xl"} bg={useColorModeValue("gray.50", "gray.800")}>
        <ModalHeader mt={3}>
          <Heading size="lg" fontWeight="semibold">
              Create a market
          </Heading>
        </ModalHeader>
        <ModalCloseButton m={"10px auto"} rounded={'xl'} />
        
        <ModalBody>
          <Box m="10px auto">
            <Formik
              initialValues={{ title: '', category: '', lockTimestamp: '', resolutionCriteria: '' }}
              validationSchema={validationSchema}
              onSubmit={async (values, actions) => {
                alert(JSON.stringify(values, null, 2));
                createVerboseMarket(values);
                actions.setSubmitting(false);
              }}
            >
              {(props) => (
                <FormStepper {...props}>
                  <Form1 />
                  <Form2 title={props.values.title} />
                </FormStepper>
              )}
            </Formik>
          </Box>
        </ModalBody>
      </ModalContent>
    </MotionConfig>
  )
}

const FormStepper = ({ children, ...props }) => {
  const { isSubmitting, errors, values } = props
  const stepsArray = React.Children.toArray(children)
  const [currentStep, setCurrentStep] = useState(0)
  const currentChild = stepsArray[currentStep]
  console.log(values)

  const buttonStyle = {
    textColor: useColorModeValue('gray.700', 'gray.100'),
    borderColor: useColorModeValue('gray.700', 'gray.100'),
    transition: 'all 0.3s ease',
    _hover: {
      bg: useColorModeValue('gray.100', 'whiteAlpha.100'),
    }
  }

  return (
    <Form>
      <Stack spacing={4}>
        {currentChild}
      </Stack>

      <Flex justifyContent={"flex-end"} mt={8} py={2}>
        <Button
          disabled={!values.title || !values.category || !values.lockTimestamp}
          variant={"outline"}
          onClick={() => {
            currentStep === 0 ? setCurrentStep(1) : setCurrentStep(0);
          }}
          sx={buttonStyle}
        >
          {currentStep === 0 ? "Next" : "Back"}
        </Button>
        {currentStep === 1 && (
          <Button 
            ml={4} 
            type="submit" 
            isDisabled={isSubmitting || !values.resolutionCriteria} 
            isLoading={isSubmitting}
            boxShadow={'xl'}
            // eslint-disable-next-line react-hooks/rules-of-hooks
            className={useColorModeValue(styles.wallet_adapter_button_trigger_light_mode, styles.wallet_adapter_button_trigger_dark_mode)}
            // eslint-disable-next-line react-hooks/rules-of-hooks
            textColor={useColorModeValue('white', '#353535')} bg={useColorModeValue('#353535', 'gray.50')} 
          >
            Submit
          </Button>
        )}
      </Flex>
    </Form>
  )
}

// START: Custom styling ReactSelect //
const collapse = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`

const chakraStyles: ChakraStylesConfig = {
  menuList: () => ({
    background: "transparent",
  }),
  menu: () => ({
    position: "relative",
    pt: 2,
    mb: 4,
    marginTop: 0,
    height: "0px",
    animation: `${collapse} 0.2s ease-in-out`,
  }),
  option: () => ({
    background: "transparent",
  }),
  input: (provided, state) => ({
    ...provided,
    color: state.hasValue ? "transparent" : "normal",
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 0,
    transition: "all 0.3s ease",
  }),
  placeholder: () => ({
    visibility: "hidden"
  })
};

const CustomReactSelect = {
  Option: ({ children, ...props }) => (
    // @ts-ignore
    <chakraComponents.Option {...props}>
      <Box
        borderWidth="1px"
        py={1}
        px={{ 'base': 1, 'md': 3 }}
        borderRadius="3xl"
        cursor="pointer"
        transition="all 0.2s ease"
        bg={useColorModeValue('gray.100', 'gray.700')}
        _hover={{
          // eslint-disable-next-line react-hooks/rules-of-hooks
          borderColor: useColorModeValue('black', 'white'),
          bg: 'transparent'
        }}
        _focus={{ shadow: 'outline', boxShadow: 'none' }}
      >
        <HStack spacing={1}>
          <Image src={props.data.iconUrl} alt={props.data.title} width={{ 'base':'9px', 'md':'14px' }} filter={useColorModeValue('invert(0%)', 'invert(100%)')} />
          <Box>
            <Text fontSize={{'base':'10px', 'md': 'sm'}} fontWeight="bold">{props.data.title}</Text>
          </Box>
        </HStack>
      </Box>
    </chakraComponents.Option>
  ),

  SingleValue: ({ children, ...props }) => {
    return (
      // @ts-ignore
      <chakraComponents.SingleValue {...props}>
        <Box
          borderWidth="1px"
          py={1}
          px={{ 'base': 1, 'md': 2 }}
          borderRadius="3xl"
          cursor="pointer"
          transition="all 0.2s"
          bg={useColorModeValue('black', 'white')}
          color={useColorModeValue('white', 'black')}
        >
          <HStack spacing={2}>
            <Image src={props.data.iconUrl} alt={props.data.title} width={{ 'base':'11px', 'md':'9px' }} filter={useColorModeValue('invert(100%)', 'invert(0%)')} />
            <Box>
              <Text fontSize={{'base':'10px', 'md': '2xs'}} fontWeight="bold">{props.data.title}</Text>
            </Box>
          </HStack>
        </Box>
      </chakraComponents.SingleValue>
    )
  },

  MenuList: ({ children, ...props }) => {
    return (
      // @ts-ignore
      <chakraComponents.MenuList {...props}>
        <HStack pt={1} bg={'transparent'} border={0} mb={'30px'} position="relative">
            {children}
        </HStack>
      </chakraComponents.MenuList>
    )
  },

  Menu: ({ children, ...props }) => {
    return (
      // @ts-ignore
      <chakraComponents.Menu {...props}>
        {children}
      </chakraComponents.Menu>
    )
  },
}

// CustomSelect design to be revisited; field values are not propagating to formik
const CustomSelect = () => {
  const categoryOptions = categories.map((category) => ({
    value: category,
    label: category,
    iconUrl: `./${category}.svg`,
    title: category
  }))
  return ( 
    <ReactSelect
      useBasicStyles
      name="category"
      options={categoryOptions}
      components={CustomReactSelect}
      chakraStyles={chakraStyles}
    />
  )
}
// END: Custom styling ReactSelect //


const ResizablePanel = ({ children }) => {
  let [ref, { height }] = useMeasure();

  return (
    <motion.div
      animate={{ height: height || "auto" }}
      className="relative overflow-hidden"
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={JSON.stringify(children, ignoreCircularReferences())}
          initial={{
            x: 384,
          }}
          animate={{
            x: 0,
            // transition: { duration: duration / 2, delay: duration / 2 },
          }}
          exit={{
            x: -384,
            // transition: { duration: duration / 2 },
          }}
          className={height ? "absolute" : "relative"}
        >
          <Box ref={ref} className="px-8 pb-8">
            {children}
          </Box>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

/*
  Replacer function to JSON.stringify that ignores
  circular references and internal React properties.
  https://github.com/facebook/react/issues/8669#issuecomment-531515508
*/
const ignoreCircularReferences = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (key.startsWith("_")) return; // Don't compare React's internal props.
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) return;
      seen.add(value);
    }
    return value;
  };
}