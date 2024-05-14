export default {
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Nextra" />
      <meta
        property="og:description"
        content="The autoinsight package documentation"
      />
    </>
  ),
  logo: <div style={{ fontWeight: "bold", fontSize: "20px" }}>Autoinsight</div>,
  nextThemes: {},
  footer: {
    text: (
      <span>
        MIT {new Date().getFullYear()} ©{" "}
        <span style={{ fontWeight: "bold" }}>Autoinsight</span>{" "}
      </span>
    ),
  },
};
