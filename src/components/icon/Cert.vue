<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 34 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 32.9341H32L1 2.02808V32.9341ZM9.84773 12.2164L21.7787 24.1116H9.84773V12.2164ZM1.96866 4.36158L8.87908 11.2507V25.0802H22.7503L29.6558 31.9645H1.96866V4.36158Z"
      :fill="iconColor"
      :stroke="iconColor"
    ></path>
    <path
      d="M31.9796 2H8.96814L31.9806 24.9427V2H31.9796ZM25.2775 16.8931L17.0439 8.68472H25.2775V16.8931ZM31.011 22.6102L26.2461 17.8599V7.71606H16.0733L11.3123 2.96866H31.0119V22.6102H31.011Z"
      :fill="iconColor"
      :stroke="iconColor"
    ></path>
  </svg>
</template>
<script>
export default {
  props: {
    iconName: {
      type: String,
      default: "cert"
    },
    width: {
      type: [Number, String],
      default: 18
    },
    height: {
      type: [Number, String],
      default: 18
    },
    iconColor: {
      type: String,
      default: "currentColor"
    }
  }
};
</script>
