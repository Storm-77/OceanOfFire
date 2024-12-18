{
  description = "Development environment for OceanOfFire game";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
  };

  outputs = { self, nixpkgs }: 
  let
    pkgs = nixpkgs.legacyPackages."x86_64-linux";
  in
  {
      devShells."x86_64-linux".default = pkgs.mkShell {
          packages = [
            pkgs.nodejs 
            pkgs.nodePackages.typescript
            pkgs.nodePackages.npm
            pkgs.go
        ];
        shellHook = ''
            export REAL_PATH=$(realpath .)
            export GOBIN=$REAL_PATH/.go       # set path to install go binaries to
            export PATH=$REAL_PATH/.go:$PATH  # shell path variable to access go binary
        
        '';


      };
  };
}

