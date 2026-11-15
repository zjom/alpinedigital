<!-- The company's address as text. Where the line is too narrow it breaks after the @, not mid-word. -->
<script lang="ts">
  import { COMPANY } from "#lib/company.ts";

  const [user, domain] = COMPANY.email.split("@");
</script>

{user}@<wbr />{domain}
