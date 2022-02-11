import { connect } from 'react-redux';

import Messages from 'src/components/Messages';

// "transforme le state en props"
const mapStateToProps = (state) => ({
  leMessage: state.messages,
});

export default connect(mapStateToProps)(Messages);
