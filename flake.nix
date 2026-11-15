{
  description = "alpinedigital.com.au development shell (Node 26, pnpm 12)";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs =
    { self, nixpkgs }:
    let
      systems = [
        "aarch64-darwin"
        "x86_64-darwin"
        "aarch64-linux"
        "x86_64-linux"
      ];
      forAllSystems = f: nixpkgs.lib.genAttrs systems (system: f nixpkgs.legacyPackages.${system});
    in
    {
      devShells = forAllSystems (
        pkgs:
        let
          nodejs = pkgs.nodejs_26;
          # pnpm runs on Node 24 by default; run it on 26, as mortar-site does.
          pnpm = pkgs.pnpm_12.override { nodejs-slim = pkgs.nodejs-slim_26; };
        in
        {
          default = pkgs.mkShell {
            packages = [
              nodejs
              pnpm
              pkgs.svelte-language-server
              pkgs.tailwindcss-language-server
              pkgs.chromium
            ];

            # For screenshots and browser checks: a Chromium that finds its
            # shared libraries on NixOS.
            env.CHROMIUM_PATH = "${pkgs.chromium}/bin/chromium";
          };
        }
      );
    };
}
